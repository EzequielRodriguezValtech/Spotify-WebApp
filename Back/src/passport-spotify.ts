import passport from "passport";
import { Strategy as SpotifyStrategy } from 'passport-spotify';

export const passportConfig = passport.use(
  new SpotifyStrategy(
    {
      clientID: '275757ca22294854a37031b1e2d240eb',
      clientSecret: 'a00a6788c45c451ca8142a12cf986b6b',
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
      scope: ['user-top-read']
    },
    function (accessToken: any, refreshToken: any, expires_in: any, profile: { id: any; }, done: (arg0: any, arg1: any) => any) {
      const user = { profile, accessToken, refreshToken, expires_in: 500};
      return done(null, user);
    }
  )
);