const crypto = require('crypto');
const bcrypt = require('bcryptjs');

function copmare(password, hashedPassword) {
  return new Promise(function (fullfill, reject) {
    if(!password || !hashedPassword) {
      return reject(false);
    }
    bcrypt.compare(password, hashedPassword, function (err, success) {
      if(err) {
        reject(err);
      } else {
        fullfill (success);
      }
    })
  })
}

module.exports = {
  copmare
};