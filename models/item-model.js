const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    itemName: { type: String, required: true },
    image: { type: String },
    quantity: { type: Number, default: 1, required: true },
    price: { type: Number, required: true },
    notes: { type: String, maxlength: 200 },
    info: { type: String },
    serialNumber: { type: String },
    web: { type: String },
    purchaseDate: { type: Date },
    returnDate: { type: Date },
    warranty: { type: Date },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Item', itemSchema);
