import { UsersController } from '@/controllers/users.controller.js';
import { isAdmin, isAuthenticated } from '@/middlewares/auth.middleware.js';
import { validate } from '@/middlewares/validate.middleware.js';
import { updateUserSchema, userIdSchema } from '@/schemas/users.schema.js';
import { Router } from 'express';

const router = Router();
const usersController = new UsersController();

router.get('/hello-new-user', isAuthenticated, (req, res) => {
  res.status(200).json({
    message: 'Hello new user',
    user: req.user,
  });
});

router.get('/', isAdmin, usersController.getAll.bind(usersController));
router.get(
  '/:id',
  isAuthenticated,
  validate(userIdSchema, 'params'),
  usersController.getOne.bind(usersController),
);
router.patch(
  '/:id',
  isAuthenticated,
  validate(userIdSchema, 'params'),
  validate(updateUserSchema, 'body'),
  usersController.update.bind(usersController),
);
router.delete(
  '/:id',
  isAuthenticated,
  validate(userIdSchema, 'params'),
  usersController.delete.bind(usersController),
);

export default router;
