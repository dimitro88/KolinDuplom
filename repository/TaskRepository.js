const Task = require('../models/TaskModel');

class TaskRepository {

  async createTask(taskBody) {
    const task = new Task(taskBody);
    return await task.save();
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
    const task = new Task(taskBody);
    return await task.save();
  }


}
module.exports = TaskRepository;
