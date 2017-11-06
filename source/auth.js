const passport = require('koa-passport');

const looger = require('../libs/logger.js');
const UsersModel = require('./models/users.js');

const Users = new UsersModel({
  logger: looger.child({ component: 'auth' }),
});

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.getById(id);

    if (!user) {
      return done(new Error('No User'));
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const YandexStrategy = require('passport-yandex').Strategy;

passport.use(
  new YandexStrategy(
    {
      clientID: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
      callbackURL: process.env.YANDEX_CALLBACK_URL || '/auth/yandex/callback',
    },
    (async (token, tokenSecret, profile, done) => {
      try {
        const existingUser = await Users.findOne({ yandex_id: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await Users.create({
          login: profile.username,
          // eslint-disable-next-line
          name: profile._json.real_name || profile.displayName,
          email: profile.emails[0].value,
          yandex_id: profile.id,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }),
  ),
);

const GoogleStrategy = require('passport-google-auth').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (async (token, tokenSecret, profile, done) => {
      try {
        const existingUser = await Users.findOne({ google_id: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        let { emails } = profile;

        if (emails.find((v) => (v.type === 'account'))) {
          emails = emails.filter((v) => (v.type === 'account'));
        }

        const newUser = await Users.create({
          login: emails[0].value,
          name: profile.displayName,
          email: emails[0].value,
          google_id: profile.id,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }),
  ),
);
