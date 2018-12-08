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

}
module.exports = InformerRepository;
