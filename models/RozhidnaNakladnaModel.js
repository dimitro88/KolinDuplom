const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;
const rozhidnaNakladnaSchema = new Schema({
  elements: [{
    elementBody: {type: mongoose.Schema.Types.ObjectId, ref: 'ObjectOfNakladna'},
    number : {type : Number}
  }],
  barCodes : {type : Array},
  totalCost: {type : Number},
  forWho : {type : String , required : true},
  },
  {
    collection: 'rozhidniNakladni',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    }
  });

rozhidnaNakladnaSchema.methods.toJSON = function () {
  const rozhidnaNakladna = this.toObject();
  return {
    type : "rozhidna",
    ..._.omit(rozhidnaNakladna,['__v'])
  }
};

const RozhidnaNakladna = mongoose.model("RozhidnaNakladna", rozhidnaNakladnaSchema);
module.exports = RozhidnaNakladna;