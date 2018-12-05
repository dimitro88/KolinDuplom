const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const informerSchema = new Schema({
    email : {type : String, required: true},
    companyId : { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
    taskId : { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true},
    firstName : {type: String, required: true},
    lastName : {type: String , required : true},
    phoneNumber: {type: String, required : true}
  },
  {
    collection: 'informers',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt'
    }
  });

informerSchema.methods.toJSON = function(){
  let informer = this.toObject();
  return{
    type:'informer',
    ..._.omit(informer,['__v'])
  }
};

const Informer = mongoose.model("Informer",informerSchema);
module.exports = Informer;