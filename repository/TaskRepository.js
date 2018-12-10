const Task = require('../models/TaskModel');
const Category = require('../models/CategoryModel');
const Informer = require('../models/InformerModel');

const brain = require('brain.js');

const network = new brain.recurrent.LSTM();

class TaskRepository {

  async createTask(taskBody) {
    const task = new Task(taskBody);
    await task.save();
    return task;
  }

  async getTaskById(task_id) {
    const task = await Task.findById(task_id).populate([
      'categoryId',
      'companyId',
    ]);
    return task;
  }

  async getListOfTasks(){
    return await Task.find();
  }


  async createTaskByInformer(TaskBody) {
    try {
      console.log(TaskBody);
      let informerBody = {
        email : TaskBody.email,
        companyId : TaskBody.companyId,
        firstName : TaskBody.firstName,
        lastName : TaskBody.lastName,
        phoneNumber : TaskBody.phoneNumber,
      };
      const informer = new Informer(informerBody);
      await informer.save();
      let tasks = await Task.find({companyId : TaskBody.companyId}).populate(["categoryId"]);
      const trainingData = tasks.map(item => {
        console.log(item.task);
        console.log(item.categoryId.name);
        return {
          input: item.task,
          output: item.categoryId.name
        };
      });

      network.train(trainingData, {
        iterations: 1000
      });

      const output = network.run(TaskBody.taskText);
      console.log(output);
      let category = await Category.findOne({name: output});
      const taskBody = {
        task : TaskBody.taskText,
        companyId : TaskBody.companyId,
        answer : output,
        categoryId : category._id
      };
      const task = new Task(taskBody);
      console.log(category);
      await task.save();
      let tasksForReturn = await Task.find({categoryId: category._id});
      return {
        category : output,
        tasksForReturn};
    }
    catch(err){
      console.log(err);
      return {
        message : "Такої категорії не знайдено!"
      }
    }
  }


}
module.exports = TaskRepository;
