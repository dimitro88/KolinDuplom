const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;
const objectOfNakladnaSchema = new Schema(
  {
    name: { type: String, required: true },
    size: {
      height: { type: String, required: true },
      length: { type: String, required: true },
      width: { type: String, required: true },
    },
  },
  {
    collection: 'objectsOfNakladna',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  },
);

objectOfNakladnaSchema.methods.toJSON = function() {
  const objectOfNakladna = this.toObject();
  return {
    ..._.omit(objectOfNakladna, ['__v']),
  };
};

const ObjectOfNakladna = mongoose.model(
  'ObjectOfNakladna',
  objectOfNakladnaSchema,
);
module.exports = ObjectOfNakladna;
