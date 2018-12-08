const TaskRepository = require('./../repository/TaskRepository');
const taskRepository = new TaskRepository();
const dbHelper = require('./../helpers/dbHelper');

module.exports = {
  /**
   * Реєструє нового оптовика
   * @param {Object} req запит
   * @param {Object} res відповідь
   * @param {Object} next наступний
   */
  createTask(req, res, next) {
    dbHelper.handleOk(res, taskRepository.createTask(req.body));
  },

  getTaskById(req, res, next){
    dbHelper.handleOk(res,
      taskRepository.getTaskById(req.swagger.params.task_id.value));
  },

  getListOfTasks(req,res,next){
    dbHelper.handleOk(res,
      taskRepository.getListOfTasks());
  },


  createTaskByInformer(req, res, next) {
    dbHelper.handleOk(res, taskRepository.createTaskByInformer(req.body));
  },

};
