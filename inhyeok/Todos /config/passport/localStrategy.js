import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import * as UserRepository from "../../repositorys/UserRepository";

const LocalStrategy = passportLocal.Strategy;
export default (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true, // 세션에 저장 여부.
      },
      async (email, password, done) => {
        try {
          const findUser = await UserRepository.findByEmailLocal(email);
          if (!findUser[0]) {
            return done(null, false);
          }
          const result = await bcrypt.compare(password, findUser[0].password);
          if (!result) {
            return done(null, false);
          }
          return done(null, findUser[0]);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
