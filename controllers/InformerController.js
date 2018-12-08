const InformerRepository = require('./../repository/InformerRepository');
const informerRepository = new InformerRepository();
const dbHelper = require('./../helpers/dbHelper');

module.exports = {
  /**
   * Реєструє нового оптовика
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  createInformer(req, res, next) {
    dbHelper.handleOk(res, informerRepository.createInformer(req.body));
  },

  getInformerById(req, res, next){
    dbHelper.handleOk(res,
      informerRepository.getInformerById(req.swagger.params.informer_id.value));
  },

  getListOfInformers(req,res,next){
    dbHelper.handleOk(res,
      informerRepository.getListOfInformers());
  },


};
