const Category = require('../models/CategoryModel');

class CategoryRepository {

  async createCategory(categoryBody) {
    const category = new Category(categoryBody);
    return await category.save();
  }

  async getListOfCategories(){
    return await Category.find();
  }

}
module.exports = CategoryRepository;
