const Category = require('../models/CategoryModel');

class CategoryRepository {

  async createCategory(categoryBody) {
    const category = new Category(categoryBody);
    return await category.save();
  }

}
module.exports = CategoryRepository;
