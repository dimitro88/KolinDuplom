const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const config = require('./../config/config.json');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  fullName: {type:String, required: true},
  role: {type:String, required: true, enum: ['user','admin']},
  phoneNumber: {type:Number},
  companies: [{
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
  }]
},{
  collection: 'users',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updateAt'
  }
});

userSchema.pre('save', function (next) {
  let user = this;
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(config.saltWorkFactor, function (err, salt) {
    if(err) return next();
    bcrypt.hash(user.password, salt, function (err, hash) {
      if(err) return next();
      user.password = hash;
      next();
    })
  })
});

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  return {
    type: 'user',
    id: obj._id,
    attributes: _.omit(obj, ['__v', 'password'])
  }
};

// userSchema.plugin(mongoosePaginate);
// userSchema.plugin(mongooseRelationship, {relationshipPathName: ['orderCreated']});

const User = mongoose.model('User', userSchema);

module.exports = User;