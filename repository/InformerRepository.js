const co = require('co');
const _ = require('lodash');
const Informer = require('../models/InformerModel');

class InformerRepository {

  async createInformer(informerBody) {
    const informer = new Informer(informerBody);
    return await informer.save();
  }

  async getInformerById(informer_id) {
    const informer = await Informer.findById(informer_id).populate([
      'categoryId',
      'taskId',
    ]);
    return informer;
  }
}
module.exports = InformerRepository;
