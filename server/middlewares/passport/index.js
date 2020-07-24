const GraphqlStrategy = require("./strategies");
const User = require("../../database/models/user");

exports.init = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
    passport.use(
        "graphql",
        new GraphqlStrategy((options, done) => {
            User.findOne({ email: options.email }, (error, user) => {
                if (error) {
                    done(error);
                }
                if (!user) {
                    return done(null, false);
                }
                user.validatePassword(options.password, (error, isMatching) => {
                    if (error) {
                        return done(error);
                    }
                    if (!isMatching) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
            });
        })
    );
};
