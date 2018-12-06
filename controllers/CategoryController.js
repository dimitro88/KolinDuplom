const CategoryRepository = require('./../repository/CategoryRepository');
const categoryRepository = new CategoryRepository();
const dbHelper = require('./../helpers/dbHelper');

module.exports = {
  /**
   * Реєструє нового оптовика
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  createCategory(req, res, next) {
    dbHelper.handleOk(res, categoryRepository.createCategory(req.body));
  },

  getListOfCategories(req,res,next){
    dbHelper.handleOk(res,
      categoryRepository.getListOfCategories());
  },
};
