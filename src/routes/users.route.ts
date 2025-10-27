import { isAuthenticated } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get('/hello-new-user', isAuthenticated, (req, res) => {
    res.status(200).json({
        message: 'Hello new user',
        user: req.user
    });
});

export default router;