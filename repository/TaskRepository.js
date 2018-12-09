const Task = require('../models/TaskModel');
const Category = require('../models/CategoryModel');

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


  async createTaskByInformer(taskBody) {
    try {
      let tasks = await Task.find().populate(["categoryId"]);
      console.log(tasks);
      const trainingData = tasks.map(item => {
        return {
          input: item.task,
          output: item.categoryId.name
        };
      });

      network.train(trainingData, {
        iterations: 50
      });

      const task = new Task(taskBody);
      const output = network.run(task.task);
      console.log(output);
      let category = await Category.findOne({name: output});
      task.answer = output;
      task.categoryId = category._id;
      await task.save();
      let tasksForReturn = await Task.find({categoryId: category._id});
      return {
        category : output,
        tasksForReturn};
    }
    catch(err){
      return {
        message : "Такої категорії не знайдено!"
      }
    }
  }


}
module.exports = TaskRepository;
