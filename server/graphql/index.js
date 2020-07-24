const { ApolloServer, gql } = require("apollo-server-express");
const { todoQueries, todoMutations, userMutations } = require("./resolvers");
const { todoTypes, userTypes } = require("./types");
const Todo = require("./models/Todo");
const User = require("./models/User");

const mongoose = require("mongoose");
const { buildAuthContext } = require("./context");

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${todoTypes},
    ${userTypes},
    type Query {
      todos: [Todo]
    }
    type Mutation {
      createTodo(input: TodoInput): Todo
      deleteAll: Boolean
      signUp(input: UserInput): String
      signIn(input: SignInInput): User
    }
  `;
  const resolvers = {
    Query: {
      ...todoQueries,
    },
    Mutation: {
      ...todoMutations,
      ...userMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Todo: new Todo(mongoose.model("Todo")),
        User: new User(mongoose.model("User")),
      },
    }),
  });
  return apolloServer;
};
