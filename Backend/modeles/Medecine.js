const mongoose = require("mongoose");

const medecineSchema = new mongoose.Schema({
  name: { type: String, require: true },
  quantity: { type: Number, require: true },
  price: { type: Number, require: true },
  supplier: { type: String, require: true },
  expiration: { type: Date, require: true },
  image: { type: String },
});

module.exports = mongoose.model("Medecine", medecineSchema);
