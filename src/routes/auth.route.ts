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
  })
)

router.get('/login-failure', (_req, res) => {
   res.status(401).json({
    error: 'Not authorized',
    message: 'Sorry, but there was an error during authentication. Please try again.',
  });
});

export default router;