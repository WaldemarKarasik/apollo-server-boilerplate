const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: String,
  createdAt: { type: Date, default: Date.now },
  user: {type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("Todo", TodoSchema);
