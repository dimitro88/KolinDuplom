const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    companyId : {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    name: {type : String , required : true}
  },
  {
    collection: 'categories',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt'
    }
  });

categorySchema.methods.toJSON = function(){
  let category = this.toObject();
  return{
    type:'category',
    ..._.omit(category,['__v'])
  }
};

const Category = mongoose.model("Category",categorySchema);
module.exports = Category;