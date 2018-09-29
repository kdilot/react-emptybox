const Websocket = require('ws');
// 1000	Account Notifications (Beta)
// 1002	Ticker Data
// 1003	24 Hour Exchange Volume
// 1010	Heartbeat

let _handleMessage = (message) => { console.warn('message not defined') }
let _handleUpdate = () => { console.warn('update not defined') }

const connect = () => {
  const webURL = new Websocket('wss://api2.poloniex.com');
  webURL.on('open', function () {
    console.log('Websocket connected')
    _handleUpdate()
    webURL.send(`{"command": "subscribe", "channel": "1002"}`)  // Ticker Data
  })
  webURL.on('message', (message) => {
    _handleMessage(message)
  })
  webURL.on('close', reconnect)
  webURL.on('error', () => {
    console.log('Websocket Error!');
  })
}

const reconnect = () => {
  console.log('Websocket reconnecting')
  setTimeout(connect, 100)
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