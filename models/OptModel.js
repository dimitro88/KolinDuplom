const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const optSchema = new Schema({
  firstName : {type : String, required: true},
  secondName : {type: String, required : true},
  firma : {type : String},
  phoneNumber : {type : String, required : true},
  email : {type: String, required: true},
  status : {type: String , enum : ["deactivated","activated","blocked"] , default: "deactivated"},
  password : {type : String, required: true}
},
  {
    collection: 'optovuku',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt'
    }
  });

optSchema.methods.toJSON = function(){
  let optovuk = this.toObject();
    return{
      type:'optovuk',
      ..._.omit(optovuk,['__v'])
    }
};

const Optovuk = mongoose.model("Optovuk",optSchema);
module.exports = Optovuk;