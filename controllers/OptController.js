const _ = require('lodash');
const OptRepository = require('./../repository/OptRepository');
const optRepository = new OptRepository();
const dbHelper = require('./../helpers/dbHelper');

module.exports = {
  /**
   * Реєструє нового оптовика
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  registerOpt(req, res, next) {
    dbHelper.handleOk(res, optRepository.registerOpt(req.body));
  },

  findDeactevatedOpts(req, res, next) {
    dbHelper.handleOk(res, optRepository.findDeactevatedOpts());
  },

  getListOpts(req, res, next) {
    dbHelper.handleOk(res, optRepository.getListOpts());
  },

  countDeactivated(req, res, next) {
    dbHelper.handleOk(res, optRepository.countDeactivated());
  },

  updateStatus(req, res, next) {
    dbHelper.handleOk(
      res,
      optRepository.updateStatus(req.swagger.params.opt_id.value, req.body),
    );
  },

  getProductsByMaterial(req, res, next) {
    dbHelper.handleOk(
      res,
      optRepository.getProductsByMaterial(
        _.get(req.swagger, 'params.material.value'),
      ),
    );
  },
};
