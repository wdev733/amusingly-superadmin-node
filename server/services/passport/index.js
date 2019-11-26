import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { jwtSecret, masterKey } from '../../config';

import Account from '../../api/v_admin/account/model';

export const password = () => async (req, res, next) => {
  const { username, password } = req.body;
  const account = await Account.getUserInfoByUserName(username);
  if (!account) {
    return res.status(404).json({ message: 'UserName not found' });
  }

  if (!Account.checkPassword(account, password)) {
    return res.status(400).json({ message: 'UserName or Password is incorrect.' });
  }

  req.logIn(account, { session: false }, err => {
    if (err) return res.status(401).end();
    next();
  });
};

export const master = () => passport.authenticate('master', { session: false });

export const token = ({ required } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, account, info) => {
    if (err || (required && !account)) {
      return res.status(401).send({ message: 'UNAUTHORIZED' });
    }
    req.logIn(account, { session: false }, err => {
      if (err) {
        return res.status(401).send({ message: 'FAILED_FETCH_USER' });
      }
      next();
    });
  })(req, res, next);

export const extractJwt = ({ required } = {}) => (req, res, next) =>
  passport.authenticate(
    'info_token',
    { session: false },
    (err, tokenInfo, info) => {
      if (err || info) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      if (required && !tokenInfo) {
        return res.status(401).send({ message: 'Token not provided' });
      }
      req.tokenInfo = tokenInfo;
      next();
    }
  )(req, res, next);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password' // this is the virtual field on the model
    },
    async (username, password, done) => {
      const account = await Account.getUserInfoByUserName(username);
      if (!account) {
        done(true);
        return null;
      }

      if (!Account.checkPassword(account, password)) {
        return done(null, false, {
          message: 'UserName or Password is incorrect.'
        });
      }

      return done(null, account);
    }
  )
);

passport.use(
  'master',
  new BearerStrategy((token, done) => {
    if (token === masterKey) {
      done(null, {});
    } else {
      done(null, false);
    }
  })
);

passport.use(
  'token',
  new JwtStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter('access_token'),
        ExtractJwt.fromBodyField('access_token'),
        ExtractJwt.fromAuthHeaderWithScheme('Bearer')
      ])
    },
    async ({ _id }, done) => {
      const account = await Account.getUserInfoById(_id);
      done(null, account);
      return null;
    }
  )
);

passport.use(
  'info_token',
  new JwtStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter('token'),
        ExtractJwt.fromBodyField('token')
      ])
    },
    (info, done) => {
      done(null, info);
    }
  )
);
