const currencyPairMap = require('./currencyPairMap');
const axios = require('axios');

const getChardData = (currencyPair, start = 1405699200, period = 86400, retry) => {
  return axios.get(`https://poloniex.com/public?command=returnChartData&currencyPair=${currencyPair}&start=${start}&end=9999999999&period=${period}`, { timeout: 15000 }).then(
    res => res.data
  )
}

const getCurrencyPairName = (id) => {
  return currencyPairMap[id]
}

const getTickers = () => {
  return axios.get('https://poloniex.com/public?command=returnTicker').then(
    res => res.data
  )
}

const getCurrenciesName = () => {
  return axios.get('https://poloniex.com/public?command=returnCurrencies').then(
    res => res.data
  )
}

const convertCurrencyPair = (message) => {
  const keys = [
    'id',
    'last',
    'lowestAsk',
    'highestBid',
    'percentChange',
    'baseVolume',
    'quoteVolume',
    'isFrozen',
    'high24hr',
    'low24hr'
  ]
  const obj = {}
  message.forEach((value, index) => {
    if (index === 0) {
      obj.name = getCurrencyPairName(value)
      return;
    }
    const key = keys[index]
    obj[key] = value
  })

  return obj
}

module.exports = {
  getCurrencyPairName,
  getTickers,
  convertCurrencyPair,
  getChardData,
  getCurrenciesName
}