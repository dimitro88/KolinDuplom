const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    code: { type: String },
    placeOnStorage: { type: String },
    notes: { type: String },
    nakladnaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nakladna',
      refPath: '_id',
      default: null,
    },
    objectOfNakladnaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ObjectOfNakladna',
      // TODO check here with refPath is it really not neaded
      default: null,
    },
    number: { type: Number },
  },
  {
    collection: 'products',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  },
);

productSchema.methods.toJSON = function() {
  const product = this.toObject();
  return {
    ..._.omit(product, ['__v']),
  };
};

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
