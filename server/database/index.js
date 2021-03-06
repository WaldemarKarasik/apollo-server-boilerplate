const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("./models/todo");
require('./models/user')
exports.connect = () => {
  mongoose.connect(
    "mongodb+srv:",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) console.log(err);
      console.log("Connected to DB");
    }
  );
};

exports.initSessionStore = () => {
    const store = new MongoDBStore({
        uri: "mongodb+srv:",
        collection: "portfolio-sessions",
    });
    return store;
};
