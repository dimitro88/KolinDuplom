const Informer = require('../models/InformerModel');
const Task = require('../models/TaskModel');

class InformerRepository {

  async createInformer(informerBody) {
    const informer = new Informer(informerBody);
    return await informer.save();
  }

  async getInformerById(informer_id) {
    const informer = await Informer.findById(informer_id).populate([
      'companyId',
      'taskId',
    ]);
    return informer;
  }

  async getListOfInformers(){
    return await Informer.find();
  }

  async createTaskByInformer(taskBody) {
    const task = new Task(taskBody);
    return await task.save();
  }

}
module.exports = InformerRepository;
