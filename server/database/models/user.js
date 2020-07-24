const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: "Email is required",
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    minlength: [6, "Minimun password length is 6 characters"],
    maxlength: [32, "Maximum password length is 32 characters"],
    required: true,
  },
  role: { enum: ["user", "admin"], type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  return next();
});
UserSchema.methods.validatePassword = function (candidatePassword, done) {
  bcrypt.compare(candidatePassword, this.password, function (error, isSuccess) {
    if (error) {
      return done(error);
    }
    return done(null, isSuccess);
  });
};

module.exports = mongoose.model("User", UserSchema);
