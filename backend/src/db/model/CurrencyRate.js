const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const Type = mongoose.Schema.Types;

const CurrencyRateSchema = new Schema({
  name: String,
  last: Type.Double,
  lowestAsk: Type.Double,
  highestBid: Type.Double,
  percentChange: Type.Double,
  baseVolume: Type.Double,
  quoteVolume: Type.Double,
  isFrozen: Type.Double,
  high24hr: Type.Double,
  low24hr: Type.Double,
  lastUpdate: {
    type: Date,
    default: new Date()
  }
})

CurrencyRateSchema.statics.drop = function () {
  // return mongoose.connection.collections['currencyrates'].drop()
  return this.collection.drop()
}

CurrencyRateSchema.statics.showAll = function (cb) {
  return this.find({}, cb)
}

CurrencyRateSchema.statics.updateTicker = function (name, data) {
  return this.findOneAndUpdate({ name }, { ...data, lastUpdate: new Date() }, { upsert: false, new: true }).exec();
}

module.exports = mongoose.model('currencyrate', CurrencyRateSchema); 