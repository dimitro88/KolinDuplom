const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    task : {type : String , required : true},
    categoryId : {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    companyId : {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    answer: {type : String , required : true}
  },
  {
    collection: 'tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt'
    }
  });

taskSchema.methods.toJSON = function(){
  let task = this.toObject();
  return{
    type:'task',
    ..._.omit(task,['__v'])
  }
};

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;