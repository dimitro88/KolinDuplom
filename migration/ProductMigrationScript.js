const mongose = require('mongoose');
const _ = require('lodash');

const config = require('../config/config.json');
const Product = require('../models/ProductModel');

mongose.Promise = global.Promise;
mongose.connect(config.productionDB, {
  useMongoClient: true
})
  .catch ((err) => {
    console.log(err);
    process.exit(1);
  });

const mockData = [
  {
    code : "ГА16400656489",
    placeOnStorage: "кавіа",
    notes: "аіа",
    nakladnaId : "5abd63012d90a9110ca87259",
  },
  {
    code : "ПО16400656489",
    placeOnStorage: " ",
    notes: " ",
    nakladnaId : "5abd63012d90a9110ca87259",
  },
  {
    code : "ГА16400658689",
    placeOnStorage: "ПАВП",
    notes: "ПАВП",
    nakladnaId : "5abd63012d90a9110ca87259",
  },
  {
    code : "ГА16400643489",
    placeOnStorage: "ПВА",
    notes: "ІФВ",
    nakladnaId : "5abd63012d90a9110ca87259",
  },
  {
    code : "ГА16400656479",
    placeOnStorage: "АІВА",
    notes: "ІВАВІ",
    nakladnaId : "5abd63012d90a9110ca87259",
  },
  {
    code : "ГА16400656480",
    placeOnStorage: "АВІ",
    notes: "ААІВА",
    nakladnaId : "5abd63012d90a9110ca87259",
  },
  {
    code : "ГА16400656459",
    placeOnStorage: "А",
    notes: "ОР",
    nakladnaId :"5abd63012d90a9110ca87259",
  },
  {
    code : "ГА16400656414",
    placeOnStorage: "АВ",
    notes: "АІВП",
    nakladnaId : "5abd63012d90a9110ca87259",
  },
  {
    code : "ГА16400656123",
    placeOnStorage: "ПАП",
    notes: "ОРП",
    nakladnaId : "5abd63012d90a9110ca87259",
  }
];

const data = _.map(mockData, item => new Product(item).save());

Promise.all(data).then(() => {
  console.log('all done , press ctrl + c')
});





