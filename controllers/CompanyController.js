const CompanyRepository = require('./../repository/CompanyRepository');
const companyRepository = new CompanyRepository();
const dbHelper = require('./../helpers/dbHelper');

module.exports = {
  /**
   * Реєструє нового оптовика
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  createCompany(req, res, next) {
    dbHelper.handleOk(res, companyRepository.createCompany(req.body));
  },

  addAdminsToCompany(req, res, next) {
    dbHelper.handleOk(res, companyRepository.addAdminsToCompany(req.swagger.params.company_id.value, req.body));
  },

  addInformersToCompany(req, res, next) {
    dbHelper.handleOk(res, companyRepository.addInformersToCompany(req.swagger.params.company_id.value, req.body));
  },

  addTasksToCompany(req, res, next) {
    dbHelper.handleOk(res, companyRepository.addTasksToCompany(req.swagger.params.company_id.value, req.body));
  },


  getCategoriesByCompanyId(req, res, next){
    dbHelper.handleOk(res,
      companyRepository.getCategoriesByCompanyId(req.swagger.params.company_id.value));
  },

  getTasksByCompanyId(req, res, next){
    dbHelper.handleOk(res,
      companyRepository.getTasksByCompanyId(req.swagger.params.company_id.value));
  },

  getListOfCompanies(req,res,next){
    dbHelper.handleOk(res,
      companyRepository.getListOfCompanies());
  },


};
