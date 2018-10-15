const WebSocket = require('ws');
const Poloniex = require('lib/poloniex');

let webURL = null;
let _handleMessage = (message) => { console.warn('message not defined on test') }
let _handleUpdate = () => { console.warn('update not defined') }

const _connect = (ws) => {
  let arr = []
  webURL = new WebSocket('wss://api2.poloniex.com')
  webURL.on('open', async function () {
    _handleUpdate()
    webURL.send(`{"command": "subscribe", "channel": "1002"}`)  // Ticker Data
    webURL.on('message', (message) => {
      const parse = JSON.parse(message)
      if (!parse) return null
      const [channel, empty, data] = parse
      if (channel && !empty && data) {
        const convert = Poloniex.convertCurrencyPair(data)
        // _handleMessage(message)
        if (arr.length < 10) {
          arr.push(convert)
        } else {
          if (ws.OPEN === ws.readyState)
            ws.send(JSON.stringify(arr))
          arr = []
        }
        // setTimeout(() => ws.send(JSON.stringify(convert)), 1000)
      }
    })
  })
}

const reconnect = (ws) => {
  setTimeout(() => _connect(ws), 3000)
}

const connect = (wss) => {
  wss.on('connection', function connection(ws) {
    console.log('Client connected!')
    _connect(ws)
    ws.on('close', function () {
      webURL.close()
    })
  })
}

module.exports = {
  connect,
  set handleMessage(message) {
    _handleMessage = message
  },
  set handleUpdate(message) {
    _handleUpdate = message
  }
}