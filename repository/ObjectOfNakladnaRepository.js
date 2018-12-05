const co = require('co');
const _ = require('lodash');
const convert = require('cyrillic-to-latin');
const CustomError = require('../errors/CustomError');

const ObjectOfNakladna = require('../models/ObjectOfNakladnaModel');
const Nakladna = require('./../models/NakladnaModel');
const Product = require('../models/ProductModel');
const moment = require('moment');
const RozhidnaNakladna = require('../models/RozhidnaNakladnaModel');
/* generateBarCode to service/GenerateBarCode*/

async function generateBarCode(element) {
  const elementsBody = await ObjectOfNakladna.findById(
    element.elementBody,
  ).exec();
  let barCode = '';
  for (let i = 0; i < 2; i++) {
    barCode += elementsBody.name[i];
  }
  for (let i = 0; i < 2; i++) {
    barCode += elementsBody.size.height[i];
  }
  for (let i = 0; i < 2; i++) {
    barCode += elementsBody.size.length[i];
  }
  let koef = 0;
  for (let i = 0; i < elementsBody.size.width.length; i++) {
    const point = ['.'];
    if (elementsBody.size.width[i] !== point[0]) {
      if (koef !== 2) {
        barCode += elementsBody.size.width[elementsBody.size.width.length - 1];
        koef++;
      }
    }
  }
  const barCodeNeeds = 13 - barCode.length;
  for (let i = 1; i < barCodeNeeds; i++) {
    const now = new Date();
    const ticks = now.getTime().toString();
    barCode += ticks[ticks.length - i];
  }
  barCode = convert(barCode.toUpperCase());

  return Promise.resolve(barCode);
}

class ObjectOfNakladnaRepository {
  addObjectOfNakladna(objectOfNakladnaBody) {
    return co.call(this, function*() {
      const objectOfNakladna = new ObjectOfNakladna(objectOfNakladnaBody);
      yield objectOfNakladna.save();
      return objectOfNakladna;
    });
  }

  getListOfNakladnaObjects() {
    return co.call(this, function*() {
      return yield ObjectOfNakladna.find();
    });
  }

  async createNakladna(nakladnaBody) {
    const elements = _.get(nakladnaBody, 'elements');
    if (elements && _.isArray(elements)) {
      nakladnaBody.totalCost = 0;
      for (let e = 0; e < elements.length; e++) {
        nakladnaBody.totalCost +=
          _.get(elements[e], 'cost') * _.get(elements[e], 'number');
        if (_.get(elements[e], 'number') > 0) {
          const savedProduct = [];
          for (let i = 0; i < elements[e].number; i++) {
            const code = await generateBarCode(elements[e]);
            savedProduct.push(
              new Product({
                code,
                objectOfNakladnaId: elements[e].elementBody,
              }).save(),
            );
          }
          const dataFromDb = await Promise.all(savedProduct);
          elements[e].productInfo = _.map(dataFromDb, item =>
            item._doc._id.toString(),
          );
        } else {
          throw new CustomError('Number of product cant be 0');
        }
      }
      const nakladna = new Nakladna(nakladnaBody);
      await nakladna.save();
      return nakladna;
    }
    return null;
  }

  getNakladna(nakladna_id) {
    return co.call(this, function*() {
      const nakladna = Nakladna.findById(nakladna_id).populate([
        'elements.elementBody',
        'elements.productInfo',
      ]);
      return yield nakladna;
    });
  }

  async getListOfNakladna() {
    const pruhidni = await Nakladna.find()
      .sort({ date: -1 })
      .populate(['elements.elementBody', 'elements.productInfo'])
      .exec();
    const rozhidni = await RozhidnaNakladna.find()
      .sort({ date: -1 })
      .populate('elements.elementBody')
      .exec();
    const nakladni = pruhidni.concat(rozhidni);
    return nakladni;
  }

  getProductByBarCode(code) {
    return co.call(this, function*() {
      return yield Product.findOne({ code })
        .populate('objectOfNakladnaId')
        .exec();
    });
  }

  async getNakladnaWithFilters(date) {
    const fromWho = _.get(date, 'fromWho');
    const dateBody = _.get(date, 'dateBody');
    const dateForFind =
      (dateBody &&
        dateBody.map(item => {
          const start = moment(item)
            .utc()
            .startOf('day')
            .toDate();
          const end = moment(item)
            .utc()
            .endOf('day')
            .toDate();
          return {
            start,
            end,
          };
        })) ||
      [];
    if (dateForFind.length > 0) {
      const arrPrigid = dateForFind.map(async element => {
        const findObject = {};
        findObject.createdAt = { $lt: element.end, $gte: element.start };
        fromWho ? (findObject.fromWho = new RegExp('^' + fromWho, 'i')) : '';
        const nakladni = await Nakladna.find(findObject)
          .populate(['elements.elementBody', 'elements.productInfo'])
          .exec();
        return nakladni;
      });

      const arrRozhid = dateForFind.map(async element => {
        const findObject = {};
        findObject.createdAt = { $lt: element.end, $gte: element.start };
        fromWho ? (findObject.fromWho = new RegExp('^' + fromWho, 'i')) : '';
        const nakladni = await RozhidnaNakladna.find(findObject)
          .populate("elements.elementBody")
          .exec();
        return nakladni;
      });

      const arrOfNakladni = await Promise.all([...arrPrigid, ...arrRozhid]);
      const returnArr = [];
      arrOfNakladni.forEach(dbArr => returnArr.push(...dbArr));
      return returnArr;
    } else if (fromWho) {
      const arrPrigid = Nakladna.find({
        fromWho: new RegExp('^' + fromWho, 'i'),
      })
        .populate(['elements.elementBody', 'elements.productInfo'])
        .exec();

      const arrRozhid = RozhidnaNakladna.find({
        forWho: new RegExp('^' + fromWho, 'i'),
      })
        .populate("elements.elementBody")
        .exec();

      const arrOfNakladni = await Promise.all([arrPrigid, arrRozhid]);
      const returnArr = [];
      arrOfNakladni.forEach(dbArr => returnArr.push(...dbArr));
      return returnArr;
    } else {
      const arrPrigid = Nakladna.find()
        .populate(['elements.elementBody', 'elements.productInfo'])
        .exec();

      const arrRozhid = RozhidnaNakladna.find()
        .populate("elements.elementBody")
        .exec();

      const arrOfNakladni = await Promise.all([arrPrigid, arrRozhid]);
      const returnArr = [];
      arrOfNakladni.forEach(dbArr => returnArr.push(...dbArr));
      return returnArr;
    }
  }

  /* async separateStoneByBarCode(barCode,separateBody) {

   }*/
}

module.exports = ObjectOfNakladnaRepository;
