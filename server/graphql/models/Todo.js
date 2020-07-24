class Todo {
  constructor(model) {
    this.Model = model;
  }
  async getAllTodos() {
    return () => this.Model.find({});
  }
  async create(todoData) {
    const createdTodo = await this.Model.create(todoData);
    return createdTodo;
  }
  async deleteAll() {
    try {
      await this.Model.deleteMany({});
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = Todo;
