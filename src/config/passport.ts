import User, { IUser } from '@/models/user.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        if (!profile.emails || !profile.emails[0]) {
          return done(new Error('Email não fornecido pelo Google'));
        }

        if (!profile.photos || !profile.photos[0]) {
          return done(new Error('Foto não fornecida pelo Google'));
        }

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            role: 'user',
            picture: profile.photos[0].value,
          });

          console.log('User created successfully:', user.email);
          return done(null, user);
        }

        user.lastLogin = new Date();
        await user.save();

        console.log('User logged in successfully:', user.email);
        return done(null, user);
      } catch (error) {
        console.error('Authentication Failed: ', error);
        return done(error, undefined);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  const userId = (user as IUser)._id.toString();

  done(null, userId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
