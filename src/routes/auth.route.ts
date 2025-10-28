import { Router } from "express";
import passport from "@/config/passport.js";
import { apiResponse } from "@/responses/apiResponse.js";

const router = Router();

router.get('/', (_req, res) => {
  apiResponse.success(res, {
    service: 'Auth',
    status: 'online'
  });
});

router.get('/google', passport.authenticate(
  'google', {
    scope: ['profile', 'email'],
  }
));

router.get('/google/callback', passport.authenticate(
  'google', {
    failureRedirect: '/login-failure',
  }),
  (_req, res) => {
    res.redirect('/api/users/hello-new-user');
  }
)

router.get('/login-failure', (_req, res) => {
  apiResponse.unauthorized(res, 'Sorry, but there was an error during authentication. Please try again.');
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if(err) {
      apiResponse.serverError(res, 'Sorry, but there was an error during logout. Message error: ' + err);
    }

    apiResponse.success(res, null, 'Logout successful');
  })

});

export default router;