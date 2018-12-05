const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  orderNumber        :{type: String, required:true},
  PIB                :{type: String, required: true},
  phoneNumber        :{type: String, required:true},
  montagePlace       :{type: String, required:true},
  deadPeoples        :{type: Array, required:true},
  dateOfBegin        :{type: Date, required:true},
  dateOfEnd          :{type: Date, required:true},
  epitaphs           :{type: String, required:true},
  status             :{type: String, required:true, enum: ['Активне', 'Завершене', 'Непогоджене']},
  images             :{type: Array},
  typeOfMontage      :{
    montageField     : {type : String, required: true, enum:['Фундамент', 'Перевізний', 'Перемичка', 'Відмостка', 'Бруківка']},
    price            : {type : Number, required:true}
 },
 delivering          :{
   deliveringField   :{type: String, required:true},
   price             :{type: Number, required:true},
 },
 typeOfPrint         :{
   printField        :{type: String, required:true},
   price             :{type: Number, required:true},
 },
 vase                :{
   vaseField         :{type: String},
   price             :{type: Number},
 },
 bench               :{
   benchField        :{type: String},
   price             :{type: Number},
 },
 painterWork         :{
   painterField      :{type: String},
    price            :{type: Number},
 },
 installing          :{
    installingField  :{type: String},
    price            :{type: Number},
 },
  riggingWorks       :{
    riggingField     :{type: String},
    price            :{type: Number},
    },
  sandstone          :{
    sandstoneField   :{type: String},
    price            :{type: Number},
  },
    brassWorks       :{
      brassField     :{type: String},
      price          :{type: Number},
    },
  memorialProductPrice :{type: Number},
  avans                :{type: Number},

  },
  {
  collection: 'orders',
    timestamps: {
    createdAt: 'createdAt',
      updatedAt: 'updateAt'
  }
});

orderSchema.methods.toJSON = function () {
  let order = this.toObject();
  return {
    type: 'order',
    id: order._id,
    attributes: _.omit(order, ['__v'])
  }
};

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;