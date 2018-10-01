const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const Type = mongoose.Schema.Types;

const ChartDataSchema = new Schema({
  name: String,
  date: Date,
  high: Type.Double,
  low: Type.Double,
  open: Type.Double,
  close: Type.Double,
  volume: Type.Double,
  quoteVolume: Type.Double,
  weightedAverage: Type.Double
})

ChartDataSchema.statics.massImport = function (name, data) {
  const converted = data.map(data => Object.assign({}, data, {
    data: data.date * 1000,
    name: name
  }))
  return this.create(converted)
}

module.exports = mongoose.model('chartdata', ChartDataSchema)