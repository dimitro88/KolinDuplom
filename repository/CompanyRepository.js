const co = require('co');
const _ = require('lodash');
const Company = require('../models/CompanyModel');
const Category = require('../models/CategoryModel');
const Task = require('../models/TaskModel');
const Informer = require('../models/InformerModel');
const User = require('../models/UserModel');

class CompanyRepository {

  async createCompany(companyBody) {
      const company = new Company(companyBody);
      return await company.save();
  }

  async addAdminsToCompany(company_id, adminsToPush){
    let company = await Company.findById(company_id);
    console.log(adminsToPush.admins);
    company.admins.forEach(async comp => {
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

  async getCategoriesByCompanyId(company_id) {
    const categories = await Category.find({companyId : company_id});
    return categories;
  }

  async getTasksByCompanyId(company_id) {
    const tasks = await Task.find({companyId : company_id});
    return tasks;
  }

  async getInformersByCompanyId(company_id) {
    const informers = await Informer.find({companyId : company_id});
    return informers;
  }

  async getListOfCompanies(){
    return await Company.find();
  }

}
module.exports = CompanyRepository;
