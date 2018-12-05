const mongose = require('mongoose');
const _ = require('lodash');

const config = require('../config/config.json');
const ObjectOfNakladna = require('../models/ObjectOfNakladnaModel');

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
    name: "Габро",
    size:{
      height: "160",
      length: "40",
      width: "0.06"
    },
  },
  {
    name: "Габро",
    size:{
      height: "160",
      length: "60",
      width: "0.06"
    },
  },
  {
    name: "Покостівка",
    size:{
      height: "50",
      length: "60",
      width: "0.03"
    },
  },
];

const data = _.map(mockData, item => new ObjectOfNakladna(item).save());

Promise.all(data).then(() => {
  console.log('all done , press ctrl + c')
});





