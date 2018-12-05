const ObjectOfNakladnaRepository = require('./../repository/ObjectOfNakladnaRepository');
const objectOfNakladnaRepository = new ObjectOfNakladnaRepository();
const dbHelper = require('./../helpers/dbHelper');

module.exports = {
  /**
   * Створює новий пам`ятник в накладній
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  addObjectOfNakladna(req, res, next){
    dbHelper.handleOk(res,
      objectOfNakladnaRepository.addObjectOfNakladna(req.body));
  },

  /**
   * Дає список усіх пам`ятників
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  getListOfNakladnaObjects(req, res, next){
    dbHelper.handleOk(res,
      objectOfNakladnaRepository.getListOfNakladnaObjects());
  },

  /**
   * Створити накладну
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  createNakladna(req, res, next){
    dbHelper.handleOk(res,
      objectOfNakladnaRepository.createNakladna(req.body));
  },

  /**
   * Дає список усіх пам`ятників
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  getNakladna(req, res, next){
    dbHelper.handleOk(res,
      objectOfNakladnaRepository.getNakladna(req.swagger.params.nakladna_id.value));
  },

  /**
   * Список накладних
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  getListOfNakladna(req,res,next){
    dbHelper.handleOk(res,
      objectOfNakladnaRepository.getListOfNakladna());
  },

  /**
   * Продукт за штрих-кодом
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  getProductByBarCode(req,res,next){
    dbHelper.handleOk(res,
      objectOfNakladnaRepository.getProductByBarCode(req.swagger.params.barCode.value))
  },

  getNakladnaWithFilters(req,res,next){
    dbHelper.handleOk(res,
      objectOfNakladnaRepository.getNakladnaWithFilters(req.body))
  },

  separateStoneByBarCode(req, res, next) {
    dbHelper.handleOk(res,
      objectOfNakladnaRepository.separateStoneByBarCode(req.swagger.params.barCode.value, req.body));
  },
};