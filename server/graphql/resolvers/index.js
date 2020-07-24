exports.todoQueries = {
  todos: async (root, args, ctx) => {
    const query = await ctx.models.Todo.getAllTodos();
    return query().lean();
  },
};

exports.todoMutations = {
  createTodo: (root, { input }, ctx) => {
    return ctx.models.Todo.create(input);
  },
  deleteAll: (root, args, ctx) => {
    return ctx.models.Todo.deleteAll();
  },
};

exports.userMutations = {
  signIn: (root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser._id;
  },
};
