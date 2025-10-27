import { Router } from "express";
import passport from "@/config/passport.js";

const router = Router();

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
    res.redirect('/users/hello-new-user');
  }
)

router.get('/login-failure', (_req, res) => {
   res.status(401).json({
    error: 'Not authorized',
    message: 'Sorry, but there was an error during authentication. Please try again.',
  });
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if(err) {
      res.status(500).json({ 
        error: 'Server error',
        message: 'Sorry, but there was an error during logout. Message error: ' + err.message,
      });
    }
    res.json({
      message: 'Logout successful'
    })
  })

});

export default router;