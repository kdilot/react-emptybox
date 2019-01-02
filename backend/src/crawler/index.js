module.exports = function (wss) {
  require('dotenv').config();
  const Poloniex = require('lib/poloniex/');
  const CurrencyRate = require('db/model/CurrencyRate');
  const Socket = require('./socket');
  const Ws = require('./ws');
  const Db = require('db');
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  const func = require('./function');

  const init = async () => {
    await Db.connect()
    await func.registCurrencyRate()
    await func.registCurrencyName()
    // func.updateCurrencyName()
    Socket.connect()
    Ws.connect(wss)
    // importInitialChartData()
    // const pa = await CurrencyRate.showAll()
  }

  const messageChannel = {
    1002: async (data) => {
      if (data) {
        const _convert = Poloniex.convertCurrencyPair(data)
        const { name } = _convert
        const convert = _objectWithoutProperties(_convert, 'name')
        try {
          await CurrencyRate.updateTicker(name, convert)
          // if (name === 'BTC_VI') {
          // console.log('[Update]', name, new Date())
          // }
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  const messageConvert = (message, ws = false) => {
    const parse = JSON.parse(message)
    if (!parse) return null
    const [channel, empty, data] = parse
    if (messageChannel[channel] && !empty)
      messageChannel[channel](data)
  }

  Ws.handleMessage = (message) => {
    messageConvert(message)
  }

  Socket.handleMessage = (message) => {
    messageConvert(message)
  }

  Socket.handleUpdate = () => {
    func.updateCurrencyRate()
  }

  Ws.handleUpdate = () => {
    func.updateCurrencyRate()
  }


  init()
}