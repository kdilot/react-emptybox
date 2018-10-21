require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise

const connect = () => {
  return (
    // mongoose.connect(process.env.MGDB_URL, { useNewUrlParser: true }).then(() => {
    mongoose.connect(process.env.MLAB_MGDB_URL, { useNewUrlParser: true }).then(() => {
      console.log('Successfully connected to mongoDB')
    }).catch(e => {
      console.error(e)
    })
  )
}

module.exports = {
  connect
}