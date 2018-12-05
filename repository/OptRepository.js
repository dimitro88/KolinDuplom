const co = require('co');
const _ = require('lodash');
const CustomError = require('../errors/CustomError');

const Optovuk = require('../models/OptModel');
const Product = require('../models/ProductModel');
const dbHelper = require('../helpers/dbHelper');
const ObjectOfNakladna = require('../models/ObjectOfNakladnaModel');
const User = require('../models/UserModel');

class OptRepository {
  registerOpt(optovukBody) {
    return co.call(this, function*() {
      let counter = 0;
      for (let i = 0; i < optovukBody.email.length; i++) {
        if (optovukBody.email[i] === '@') {
          counter++;
        }
      }
      if (counter === 0) {
        return new CustomError('Неправильно введений e-mail');
      }
      const optovuk = new Optovuk(optovukBody);
      yield optovuk.save();
      return optovuk;
    });
  }

  findDeactevatedOpts() {
    return co.call(this, function*() {
      return yield Optovuk.find({ status: 'deactivated' });
    });
  }

  getListOpts() {
    return co.call(this, function*() {
      return yield Optovuk.find();
    });
  }

  countDeactivated() {
    return new Promise((resolve, reject) => {
      Optovuk.count({ status: 'deactivated' }, function(err, count) {
        if (err) {
          reject(err);
        }
        resolve({ count });
      });
    });
  }

  async updateStatus(opt_id,StatusBody) {
    let status = _.get(StatusBody, "status");
    console.log(status);
    if (status === "activated") {
      let optovukFromBd = await Optovuk.findById(opt_id);
      let optovuk = {};
      optovuk.fullName = optovukFromBd.firstName + " " + optovukFromBd.secondName;
      optovuk.login = optovukFromBd.email;
      optovuk.role = "optovuk";
      optovuk.password = optovukFromBd.password;
      console.log(optovuk);
      let newOptovuk = new User(optovuk);
      await newOptovuk.save();
      let updatedOptovuk = await Optovuk.findByIdAndUpdate(opt_id, StatusBody, {new: true});
      return {
        updatedOptovuk,
        newOptovuk
      }
    }
    else if (status === "blocked" || status === "deactivated") {
      let optovukFromBd = await Optovuk.findById(opt_id);
      let userToRemove = await User.findOne({
        login: optovukFromBd.email,
        fullName: optovukFromBd.firstName + " " + optovukFromBd.secondName,
        role: "optovuk"
      });
      await Optovuk.findByIdAndUpdate(opt_id, StatusBody, {new: true});
      await User.remove(userToRemove);
      return {
        message: "Оптовик заблокований"
      }
    }
    else {
      return {
        message: "Некоректно введений статус введіть : activated , blocked or deactivated"
      }
    }
  }

  async updateStatus(opt_id, StatusBody) {
    const status = _.get(StatusBody, 'status');
    console.log(status);
    if (status === 'activated') {
      const optovukFromBd = await Optovuk.findById(opt_id);
      const optovuk = {};
      optovuk.fullName =
        optovukFromBd.firstName + ' ' + optovukFromBd.secondName;
      optovuk.login = optovukFromBd.email;
      optovuk.role = 'optovuk';
      optovuk.password = optovukFromBd.password;
      console.log(optovuk);
      const newOptovuk = new User(optovuk);
      await newOptovuk.save();
      const updatedOptovuk = await Optovuk.findByIdAndUpdate(
        opt_id,
        StatusBody,
        {
          new: true,
        },
      );
      return {
        updatedOptovuk,
        newOptovuk,
      };
    } else if (status === 'blocked') {
      const optovukFromBd = await Optovuk.findById(opt_id);
      const userToRemove = await User.findOne({
        login: optovukFromBd.email,
        fullName: optovukFromBd.firstName + ' ' + optovukFromBd.secondName,
        role: 'optovuk',
      });
      await Optovuk.findByIdAndUpdate(opt_id, StatusBody, { new: true });
      await User.remove(userToRemove);
      return {
        message: 'Оптовик заблокований',
      };
    } else {
      return await Optovuk.findByIdAndUpdate(opt_id, StatusBody, { new: true });
    }
  }

  async getProductsByMaterial(material) {
    const arrFromAggregate = await dbHelper.aggregate(
      Product,
      [
        {
          $group: {
            _id: '$objectOfNakladnaId',
            count: { $sum: 1 },
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
        return { ..._.omit(element, ['data']), ...includedItem };
      },
    );
    if (material) {
      for (let i = 0; i < arrFromAggregate.length; i++) {
        if (arrFromAggregate[i].name !== material) {
          arrFromAggregate.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < arrFromAggregate.length; i++) {
      arrFromAggregate[i].number = i + 1;
      if (arrFromAggregate[i].count > 10) {
        arrFromAggregate[i].count = 'Більше 10';
      } else {
        arrFromAggregate[i].count = arrFromAggregate[i].count;
      }
    }
    return arrFromAggregate;
  }
}
module.exports = OptRepository;
