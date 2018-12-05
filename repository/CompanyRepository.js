const co = require('co');
const _ = require('lodash');
const Company = require('../models/CompanyModel');

class CompanyRepository {

  async createCompany(companyBody) {
      const company = new Company(companyBody);
      return await company.save();
  }

  async addAdminsToCompany(company_id, adminsToPush){
    let company = await Company.findById(company_id);
    console.log(adminsToPush.admins);
    company.admins.forEach(comp => {
      console.log(comp);
      adminsToPush.admins.push(comp);
    });
    return await Company.findByIdAndUpdate(company_id, adminsToPush, { new: true });
  }

  async addInformersToCompany(company_id, informersToPush){
    let company = await Company.findById(company_id);
    console.log(informersToPush.informers);
    company.informers.forEach(comp => {
      console.log(comp);
      informersToPush.informers.push(comp);
    });
    return await Company.findByIdAndUpdate(company_id, informersToPush, { new: true });
  }

  async addTasksToCompany(company_id, tasksToPush){
    let company = await Company.findById(company_id);
    console.log(tasksToPush.informers);
    company.tasks.forEach(comp => {
      console.log(comp);
      tasksToPush.tasks.push(comp);
    });
    return await Company.findByIdAndUpdate(company_id, tasksToPush, { new: true });
  }
}
module.exports = CompanyRepository;
