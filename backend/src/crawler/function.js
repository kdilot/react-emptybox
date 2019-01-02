require('dotenv').config();
const Poloniex = require('lib/poloniex/');
const CurrencyRate = require('db/model/CurrencyRate');
const CurrencyName = require('db/model/CurrencyName');
const currencyPairMap = require('lib/poloniex/currencyPairMap');
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }


module.exports.registCurrencyRate = async function registCurrencyRate() {
  const tickers = await Poloniex.getTickers()
  console.log('[Drop Rate]')
  await CurrencyRate.drop()
  const keys = Object.keys(tickers)
  const param = keys.map(key => {
    const ticker = tickers[key]
    const data = Object.assign({ name: key }, ticker)
    const currency = new CurrencyRate(data)
    return currency.save()
  })

  try {
    await Promise.all(param)
  } catch (e) {
    console.log(e)
  }
}

module.exports.importInitialChartData = async function importInitialChartData() {
  const currencyPairs = []
  for (let key in currencyPairMap) {
    currencyPairs.push(currencyPairMap[key])
  }
  // console.log(currencyPairs)
  const requests = Poloniex.getChardData(currencyPairs[0])
  // await Promise.all(requests)
  // console.log(requests)
}

module.exports.updateCurrencyRate = async function updateCurrencyRate() {
  const tickers = await Poloniex.getTickers()
  const keys = Object.keys(tickers)
  const param = keys.map(key => {
    const ticker = tickers[key]
    const convert = _objectWithoutProperties(ticker, 'id')
    return CurrencyRate.updateTicker(key, convert)
  })

  try {
    await Promise.all(param).then(() => {
      console.log('[Updated Currency Rate]')
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports.registCurrencyName = async function registCurrencyName() {
  console.log('[Drop Name]')
  CurrencyName.drop()
  const info = await Poloniex.getCurrenciesName()
  const keys = Object.keys(info)
  const param = keys.map(key => {
    const currency = info[key]
    const data = Object.assign({ currency: key }, currency)
    const currencies = new CurrencyName(data)
    return currencies.save()
  })

  try {
    await Promise.all(param)
  } catch (e) {
    console.log(e)
  }
}

module.exports.updateCurrencyName = async () => {
  const info = await Poloniex.getCurrenciesName()
  const keys = Object.keys(info)
  const param = keys.map(key => {
    const currency = info[key]
    const convert = _objectWithoutProperties(currency, 'currency')
    return CurrencyName.updateCurrencyName(key, convert)
  })

  try {
    await Promise.all(param).then(() => {
      console.log('[Updated Currency Name]')
    })
  } catch (e) {
    console.log(e)
  }
}