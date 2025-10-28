import { UsersController } from "@/controllers/usersController.js";
import { isAdmin, isAuthenticated } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();
const usersController = new UsersController();

router.get('/hello-new-user', isAuthenticated, (req, res) => {
    res.status(200).json({
        message: 'Hello new user',
        user: req.user
    });
});

router.get('/', isAdmin, usersController.getAll.bind(usersController));
router.get('/:id', isAuthenticated, usersController.getAll.bind(usersController));
router.patch('/:id', isAuthenticated, usersController.update.bind(usersController));
router.delete('/:id', isAuthenticated, usersController.delete.bind(usersController));

export default router;