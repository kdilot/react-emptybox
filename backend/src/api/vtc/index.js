const vtc = require('express').Router();
const CurrencyRate = require('db/model/CurrencyRate');
const CurrencyName = require('db/model/CurrencyName');
const func = require('crawler/function');
const Poloniex = require('lib/poloniex/index');

vtc.get('/state', (req, res) => {
  func.updateCurrencyRate().then(() => {
    CurrencyRate.showAll((err, result) => {
      res.json(result)
    })
  })
})

vtc.get('/currencyname', (req, res) => {
  CurrencyName.showAll((err, result) => {
    res.json(result)
  })
})

vtc.post('/currencychart', (req, res) => {
  const { currencyPair, day } = req.body.data
  const today = Math.round((new Date() / 1000))
  let start = 0
  let period = 86400
  if (day) {
    if (day === 365)
      period = 86400
    else if (day === 30)
      period = 7200
    else if (day === 7)
      period = 1800
    else if (day === 1)
      period = 300
    start = today - day * 60 * 60 * 24
  }

  if (currencyPair)
    Poloniex.getChardData(currencyPair, start, period).then(result => {
      res.json(result)
    })
})

// vtc.get('/currencyInfo', (req, res) => {
//   func.updateCurrencyRate()
//   res.json(1)
// })

module.exports = vtc