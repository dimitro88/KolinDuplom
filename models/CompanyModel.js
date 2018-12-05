const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name : {type : String, required: true},
  admins: [
    {
      adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
      }
    }
  ],
  tasks: [
    {
      taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
      }
    }
  ],
  informers: [
    {
      informernId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Informer',
        required: true,
      }
    }
  ],
  },
  {
    collection: 'companies',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt'
    }
  });

companySchema.methods.toJSON = function(){
  let company = this.toObject();
  return{
    type:'company',
    ..._.omit(company,['__v'])
  }
};

const Company = mongoose.model("Company",companySchema);
module.exports = Company;