const passport = require('koa-passport');

const User = require('./models/schema/user.js');

passport.serializeUser((user, done) => {
  // eslint-disable-next-line
  done(null, user._id); 
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

const YandexStrategy = require('passport-yandex').Strategy;

const YANDEX_CLIENT_ID = '5afe0eea0970460281e088e0cd73c85d';
const YANDEX_CLIENT_SECRET = 'aa6dd55eace04420a005db91323d90f2';

passport.use(
  new YandexStrategy(
    {
      clientID: YANDEX_CLIENT_ID,
      clientSecret: YANDEX_CLIENT_SECRET,
      callbackURL: '/auth/yandex/callback',
    },
    ((token, tokenSecret, profile, done) => {
      // retrieve user
      User.findOne({ yandex_id: profile.id }).then((existingUser) => {
        if (existingUser) {
          return done(null, existingUser);
        }
        new User({
          yandex_id: profile.id,
        })
          .save()
          .then((user) => done(null, user));
        return true;
      });
    }),
  ),
);

const GoogleStrategy = require('passport-google-auth').Strategy;

const GOOGLE_CLIENT_ID =
  '364365817647-sfuvcchnk9t7j9hlueh6bh7fee27k7j2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'FPMSrABA7qoDBWK5e6QjhRlE';

passport.use(
  new GoogleStrategy(
    {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:
        `http://localhost:${
          process.env.PORT || 8000
        }/auth/google/callback`,
    },
    ((token, tokenSecret, profile, done) => {
      // retrieve user
      User.findOne({ google_id: profile.id }).then((existingUser) => {
        if (existingUser) {
          return done(null, existingUser);
        }
        new User({
          google_id: profile.id,
        })
          .save()
          .then((user) => done(null, user));
        return true;
      });
    }),
  ),
);
