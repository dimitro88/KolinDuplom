const RozhidnaNakladnaRepository = require('./../repository/RozhidnaNakladnaRepository');
const rozhidnaNakladnaRepository = new RozhidnaNakladnaRepository();
const dbHelper = require('./../helpers/dbHelper');

module.exports = {
  createRozhidnaNakladna(req, res, next){
    dbHelper.handleOk(res,
      rozhidnaNakladnaRepository.createRozhidnaNakladna(req.body));
  },

  getRozhidnaNakladnaById(req, res, next){
    dbHelper.handleOk(res,
      rozhidnaNakladnaRepository.getRozhidnaNakladnaById(req.swagger.params.rozhidna_id.value));
  },

  getListOfRozhidnaNakladna(req,res,next){
    dbHelper.handleOk(res,
      rozhidnaNakladnaRepository.getListOfRozhidnaNakladna());
  },

};