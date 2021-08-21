import passport from "passport";
import { IUserModel, User } from "../api/models/user";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import l from "../common/logger";

export function passportInitialize(app) {
  l.info("Passport initialize");
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function (user: IUserModel, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    const user = User.findById(id);
    done(null, user);
  });

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
        issuer: "accounts.localhost",
        audience: "website",
      },
      function (jwt_payload: any, done) {
        l.debug(jwt_payload);
        User.find({ token: jwt_payload.sub }, function (err, user) {
          if (err) done(err, null);
          if (user) done(null, user);
          else done(null, false);
        });
      }
    )
  );
}
