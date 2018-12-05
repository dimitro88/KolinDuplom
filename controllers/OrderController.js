const OrderRepository = require('./../repository/OrderRepository');
const orderRepository = new OrderRepository();
const dbHelper = require('./../helpers/dbHelper');

module.exports = {
  /**
   * Створює нове замовлення
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  addOrder(req, res, next){
    dbHelper.handleOk(res,
     orderRepository.addOrder(req.body));
  },

  /**
   * Повертає список замовлень
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  ordersList(req, res, next){
    dbHelper.handleOk(res,
      orderRepository.ordersList());
  },

  /**
   * Шукає замоввлення за ID
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  orderById(req, res, next){
    dbHelper.handleOk(res,
      orderRepository.orderById(req.swagger.params.order_id.value));
  },

  /**
   * Обновляє замовлення за ID
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  orderUpdate(req, res, next){
    dbHelper.handleOk(res,
      orderRepository.orderUpdate(req.swagger.params.order_id.value, req.body));
  },
};