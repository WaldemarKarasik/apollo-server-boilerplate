exports.userTypes = `
type User {
    _id: ID
    username: String
    password: String
    role: String
    email: String
    todos: [Todo]
}
input UserInput {
   username: String
   email: String
   password: String
   passwordConfirmation: String
}
input SignInInput {
  email: String
  password: String
}
`;

exports.todoTypes = `
  type Todo {
    _id: ID
    title: String,
    createdAt: String
    user: User
  }
  input TodoInput {
    title: String
  }
`;
