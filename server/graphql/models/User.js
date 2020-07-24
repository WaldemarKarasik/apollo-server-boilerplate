class User {
  constructor(model) {
    this.Model = model;
  }
  async signIn(signInData, ctx) {
    try {
      const user = await ctx.authenticate(signInData);
      return user;
    } catch (e) {
      return e;
    }
  }
  async signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error("Password must be the same as confirmation password");
    }
    try {
      return await this.Model.create(signUpData);
    } catch (error) {
      if (error.code && error.code === 11000) {
        throw new Error("User with provided email already exists");
      } else {
        throw error;
      }
    }
  }
}

module.exports = User;
