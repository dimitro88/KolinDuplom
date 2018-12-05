const co = require('co');
const _ = require('lodash');
const dbHelper = require('../helpers/dbHelper');

const RozhidnaNakladna = require('../models/RozhidnaNakladnaModel');
const Product = require('../models/ProductModel');
const Nakladna = require('../models/NakladnaModel');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

class RozhidnaNakladnaRepository {
  async createRozhidnaNakladna(RozhidnaBody) {
    RozhidnaBody.totalCost = 0;
    const barCodes = _.get(RozhidnaBody, 'barCodes');
    const cost = async () => {
      let total = 0;
      await asyncForEach(barCodes, async element => {
        const product = await Product.findOne({ code: element });
        const nakladna = await Nakladna.findById(product.nakladnaId).exec();
        const objectOfNakladnaId = product.objectOfNakladnaId;
        nakladna.elements.forEach(elementOfNakladna => {
          if (
            elementOfNakladna.elementBody.toString() ===
            objectOfNakladnaId.toString()
          ) {
            total += elementOfNakladna.cost;
          }
        });
      });
      return total;
    };
    RozhidnaBody.totalCost = await cost();
    RozhidnaBody.barCodes = barCodes;
    const products = barCodes.map(async element => {
      const product = await Product.findOne({ code: element });
      return product;
    });
    const arrOfProducts = await Promise.all(products);
    RozhidnaBody.elements = [];
    arrOfProducts.forEach(async element => {
      RozhidnaBody.elements.push({ elementBody: element.objectOfNakladnaId });
      await Product.findOne({ code: element.code }).remove();
    });
    const objects = _.get(RozhidnaBody, 'elements');
    const objectsId = objects.map(element => {
      return element.elementBody;
    });
    const usedId = [];
    const counters = [];
    for (let i = 0; i < objectsId.length; i++) {
      let counter = 0;
      let counterForBreak = 0;
      for (let k = 0; k < usedId.length; k++) {
        if (
          usedId.length > 0 &&
          objectsId[i].toString() === usedId[k].toString()
        ) {
          counterForBreak++;
          break;
        }
      }
      if (counterForBreak > 0 && i === objectsId.length - 1) {
        break;
      }
      if (counterForBreak > 0) {
        continue;
      }
      if (usedId.length === 0) {
        usedId.push(objectsId[i]);
      }
      let additionalCounter = 0;
      for (let l = 0; l < usedId.length; l++) {
        if (
          objectsId[i].toString() === usedId[l].toString() &&
          usedId.length > 0
        ) {
          additionalCounter++;
        }
      }
      if (additionalCounter === 0) {
        usedId.push(objectsId[i]);
      }
      for (let j = 0; j < objectsId.length; j++) {
        if (i <= objectsId.length) {
          if (objectsId[i].toString() === objectsId[j].toString()) {
            counter++;
          }
        }
      }
      counters.push(counter);
    }
    RozhidnaBody.elements = [];
    for (let i = 0; i < usedId.length; i++) {
      RozhidnaBody.elements[i] = {
        elementBody: usedId[i],
        number: counters[i],
      };
    }
    const rozhidnaNakladna = new RozhidnaNakladna(RozhidnaBody);
    await rozhidnaNakladna.save();
    return rozhidnaNakladna;
  }

  async getRozhidnaNakladnaById(rozhidna_id) {
    return await RozhidnaNakladna.findById(rozhidna_id)
      .populate('elements.elementBody')
      .exec();
  }

  async getListOfRozhidnaNakladna() {
    return await RozhidnaNakladna.find()
      .populate('elements.elementBody')
      .exec();
  }
}

module.exports = RozhidnaNakladnaRepository;
