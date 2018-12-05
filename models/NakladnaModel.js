const mongoose = require('mongoose');
const ProductModel = require('./ProductModel');
const _ = require('lodash');
const Schema = mongoose.Schema;
const nakladnaSchema = new Schema(
  {
    elements: [
      {
        elementBody: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ObjectOfNakladna',
          required: true,
        },
        number: { type: Number, required: true },
        cost: { type: Number, required: true },
        productInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      },
    ],
    totalCost: { type: Number },
    number: { type: String },
    date: { type: Date, required: true },
    fromWho: { type: String, required: true },
  },
  {
    collection: 'nakladni',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  },
);

nakladnaSchema.methods.toJSON = function() {
  const nakladna = this.toObject();
  return {
    type: 'Прихідна',
    ..._.omit(nakladna, ['__v']),
  };
};

nakladnaSchema.post('save', async ({ _doc }) => {
  let elements = _doc.elements.toObject();
  elements = elements.map(element => {
    return element.productInfo.map(product => product.toString());
  });
  const findIds = [];
  for (let i = 0; i < elements.length; i++) {
    for (let j = 0; j < elements[i].length; j++) {
      findIds.push(elements[i][j]);
    }
  }
  const nakladnaId = _doc._id.toString();
  const products = await ProductModel.find({ _id: { $in: findIds } });
  products.forEach(async product => {
    product.nakladnaId = nakladnaId;
    await product.save();
  });
});

nakladnaSchema.pre('save', function(next) {
  // Only increment when the document is new
  console.log('pre save');
  if (this.isNew) {
    Nakladna.count().then(
      res => {
        this.number = 'P-' + res; // Increment count
        next();
      },
      e => console.error(e),
    );
  } else {
    next();
  }
});
const Nakladna = mongoose.model('Nakladna', nakladnaSchema);

module.exports = Nakladna;
