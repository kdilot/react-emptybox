const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const Type = mongoose.Schema.Types;

const CurrencyNameSchema = new Schema({
  currency: String,
  name: String,
  id: Number,
  txFee: Type.Double,
  minConf: Type.Double,
  depositAddress: String,
  disabled: Number,
  delisted: Number,
  frozen: Number,
  lastUpdate: {
    type: Date,
    default: new Date()
  }
})

CurrencyNameSchema.statics.drop = function () {
  return this.collection.drop()
}

CurrencyNameSchema.statics.showAll = function (cb) {
  return this.find({}, cb)
}

CurrencyNameSchema.statics.updateCurrencyName = function (currency, data) {
  return this.findOneAndUpdate({ currency }, { ...data, lastUpdate: new Date() }, { upsert: false, new: true }).exec()
}

module.exports = mongoose.model('currencyname', CurrencyNameSchema)