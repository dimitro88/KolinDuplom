const co = require('co');

const Order = require('./../models/OrderModel');
// const UnauthorizedError = require('./../errors/ForbiddenError');


class OrderRepository {
  addOrder(orderBody){
    return co.call(this, function* () {
      let order  = new Order(orderBody);
      yield order.save();
      return order;
    });
  }
  ordersList(){
    return co.call(this, function* () {
      return yield Order.find();
    });
  }
  orderById(order_id){
    return co.call(this, function* (){
      return yield Order.findById(order_id);
    })
  }
  orderUpdate(order_id, orderBody){
    return co.call(this, function* (){
      return yield Order.findByIdAndUpdate(order_id, orderBody);
    })
  }
}
module.exports = OrderRepository;