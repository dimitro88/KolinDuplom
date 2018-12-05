const ProductRepository = require('./../repository/ProductRepository');
const productRepository = new ProductRepository();
const dbHelper = require('./../helpers/dbHelper');

module.exports = {
  /**
   * Вертає список товарів на складі
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  getProductsByNakladna(req, res, next) {
    dbHelper.handleOk(res, productRepository.getProductsByNakladna());
  },

  createProduct(req, res, next) {
    dbHelper.handleOk(res,
      productRepository.createProduct(req.body));
  },

  updateProductById(req, res, next){
    dbHelper.handleOk(res,
      productRepository.updateProductById(req.swagger.params.product_id.value, req.body))
  },

};
