import passport from 'passport';
import { OIDCStrategy } from 'passport-azure-ad';

passport.use(new OIDCStrategy({
    identityMetadata: `https://login.microsoftonline.com/${process.env.TENANT_ID}/v2.0/.well-known/openid-configuration`,
    clientID: process.env.CLIENT_ID as string,
    responseType: 'code',
    responseMode: 'query',
    redirectUrl: 'http://localhost:3000/auth/callback',
    clientSecret: process.env.CLIENT_SECRET,
    scope: ['profile', 'email', 'openid'],
    allowHttpForRedirectUrl: true,
    passReqToCallback: true
  },
  (req:any,iss: any, sub: any, profile: any, accessToken: any, refreshToken: any, done: any) => {
    return done(null, profile);
  }
));

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));