require('dotenv').config();
const Poloniex = require('lib/poloniex/');
const CurrencyRate = require('db/model/CurrencyRate');
const Socket = require('./socket');
const Db = require('db');
const currencyPairMap = require('lib/poloniex/currencyPairMap');
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const init = async () => {
  await Db.connect()
  // await registCurrencyRate()
  Socket.connect()
  // importInitialChartData()
  // const pa = await CurrencyRate.showAll()
}

async function registCurrencyRate() {
  const tickers = await Poloniex.getTickers()
  console.log('[Drop]')
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

async function importInitialChartData() {
  const currencyPairs = []
  for (let key in currencyPairMap) {
    currencyPairs.push(currencyPairMap[key])
  }
  // console.log(currencyPairs)
  const requests = Poloniex.getChardData(currencyPairs[0])
  // await Promise.all(requests)
  // console.log(requests)
}

async function updateCurrencyRate() {
  const tickers = await Poloniex.getTickers()
  const keys = Object.keys(tickers)
  const param = keys.map(key => {
    const ticker = tickers[key]
    const convert = _objectWithoutProperties(ticker, 'id')
    return CurrencyRate.updateTicker(key, convert)
  })

  try {
    await Promise.all(param)
  } catch (e) {
    console.log(e)
  }
  console.log('[Updated Currency Rate]')
}

const messageChannel = {
  1002: async (data) => {
    if (data) {
      const _convert = Poloniex.convertCurrencyPair(data)
      const { name } = _convert
      const convert = _objectWithoutProperties(_convert, 'name')
      try {
        await CurrencyRate.updateTicker(name, convert)
        if (name === 'BTC_ETH') {
          console.log('[Update]', name, new Date())
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}

Socket.handleMessage = (message) => {
  const parse = JSON.parse(message)
  if (!parse) return null
  const [channel, empty, data] = parse
  if (messageChannel[channel] && !empty)
    messageChannel[channel](data)
}

Socket.handleUpdate = () => {
  updateCurrencyRate()
}


init()