const co = require('co');
const _ = require('lodash');

const Product = require('../models/ProductModel');
const ObjectOfNakladna = require('../models/ObjectOfNakladnaModel');
const dbHelper = require('../helpers/dbHelper');
const barCode = require('../service/GenerateBarCode.js');

class ProductRepository {
  async getProductsByNakladna() {
    let arrFromAggregate = await dbHelper.aggregate(
      Product,
      [
        {
          $group: {
            _id: '$objectOfNakladnaId',
            count: {$sum: 1},
          },
        },
        {
          $lookup: {
            from: 'objectsOfNakladna',
            localField: '_id',
            foreignField: '_id',
            as: 'data',
          },
        },
      ],
      element => {
        let includedItem = _.get(element, ['data'])[0];
        includedItem = _.omit(includedItem, ['__v']);
        return {..._.omit(element, ['data']), ...includedItem};
      },
    );
    for(let i = 0; i < arrFromAggregate.length; i++){
        arrFromAggregate[i].number = i+1;
    }
    return arrFromAggregate;
  }

  createProduct(productBody) {
    return co.call(this, function* () {
      const product = new Product(productBody);
      yield product.save();
      return product;
    });
  }

  updateProductById(product_id,ProductBody){
    return co.call(this, function* () {
      return yield Product.findByIdAndUpdate(product_id,ProductBody, { new: true });
    });
  }


}
module.exports = ProductRepository;
