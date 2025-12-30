import { Router } from 'express';
import passport from '@/config/passport.js';
import { apiResponse } from '@/responses/apiResponse.js';
import { validate } from '@/middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '@/schemas/auth.schema.js';
import User from '@/models/user.js';
import bcrypt from 'bcryptjs';
import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  getAccessCookieOptions,
  getRefreshCookieOptions,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@/config/jwt.js';
import { isAuthenticated } from '@/middlewares/auth.middleware.js';

const router = Router();

router.get('/', (_req, res) => {
  apiResponse.success(res, {
    service: 'Auth',
    status: 'online',
  });
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failure',
    session: false,
  }),
  (req, res) => {
    const user = req.user;

    if (!user || typeof user !== 'object' || !('_id' in user) || !('role' in user)) {
      return apiResponse.unauthorized(res, 'Authentication required.');
    }

    const payload = {
      sub: String((user as { _id: unknown })._id),
      role: (user as { role: 'user' | 'admin' }).role,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    res.cookie(ACCESS_COOKIE_NAME, accessToken, getAccessCookieOptions());
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());

    const redirectTo = process.env.AUTH_SUCCESS_REDIRECT_URL || '/';
    return res.redirect(redirectTo);
  },
);

router.get('/login-failure', (_req, res) => {
  apiResponse.unauthorized(
    res,
    'Sorry, but there was an error during authentication. Please try again.',
  );
});

router.post('/register', validate(registerSchema, 'body'), async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const existing = await User.findOne({ email }).select('_id');
    if (existing) {
      return apiResponse.error(res, 'Email already in use', 409);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: 'user',
      lastLogin: new Date(),
    });

    const payload = { sub: user._id.toString(), role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    res.cookie(ACCESS_COOKIE_NAME, accessToken, getAccessCookieOptions());
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());

    return apiResponse.success(
      res,
      {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          picture: user.picture,
        },
      },
      'User registered successfully',
      201,
    );
  } catch (err) {
    return apiResponse.serverError(res, err);
  }
});

router.post('/login', validate(loginSchema, 'body'), async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email }).select('+passwordHash -__v');
    if (!user || !user.passwordHash) {
      return apiResponse.unauthorized(res, 'Invalid credentials');
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return apiResponse.unauthorized(res, 'Invalid credentials');
    }

    user.lastLogin = new Date();
    await user.save();

    const payload = { sub: user._id.toString(), role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    res.cookie(ACCESS_COOKIE_NAME, accessToken, getAccessCookieOptions());
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());

    return apiResponse.success(res, {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        picture: user.picture,
      },
    });
  } catch (err) {
    return apiResponse.serverError(res, err);
  }
});

router.post('/refresh', (req, res) => {
  try {
    const token = req.cookies?.[REFRESH_COOKIE_NAME];

    if (!token || typeof token !== 'string') {
      return apiResponse.unauthorized(res, 'Authentication required.');
    }

    const payload = verifyRefreshToken(token);
    const accessToken = signAccessToken({ sub: payload.sub, role: payload.role });

    res.cookie(ACCESS_COOKIE_NAME, accessToken, getAccessCookieOptions());

    return apiResponse.success(res, null, 'Token refreshed');
  } catch {
    return apiResponse.unauthorized(res, 'Authentication required.');
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie(ACCESS_COOKIE_NAME, { path: '/' });
  res.clearCookie(REFRESH_COOKIE_NAME, { path: '/api/auth/refresh' });
  return apiResponse.success(res, null, 'Logout successful');
});

router.get('/me', isAuthenticated, (req, res) => {
  return apiResponse.success(res, {
    user: req.user,
  });
});

export default router;

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints de autenticação
 *   - name: Users
 *     description: Endpoints de gerenciamento de usuários
 *   - name: Tasklists
 *     description: Endpoints de gerenciamento de listas de tarefas
 *   - name: Tasks
 *     description: Endpoints de gerenciamento de tarefas
 */

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Verifica o status do serviço de autenticação
 *     description: Retorna o status do serviço de autenticação
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Serviço de autenticação online
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service:
 *                   type: string
 *                   example: Auth
 *                 status:
 *                   type: string
 *                   example: online
 */

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Inicia o fluxo de autenticação com Google
 *     description: Redireciona o usuário para a página de login do Google
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirecionamento para a página de login do Google
 */

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Callback da autenticação com Google
 *     description: Endpoint de callback após a autenticação com Google. Redireciona para a página de boas-vindas em caso de sucesso ou para a página de erro em caso de falha
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Código de autorização do Google
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Estado da requisição
 *     responses:
 *       302:
 *         description: Redirecionamento para a página de boas-vindas ou de erro
 */

/**
 * @swagger
 * /api/auth/login-failure:
 *   get:
 *     summary: Página de erro de autenticação
 *     description: Retorna uma mensagem de erro quando a autenticação falha
 *     tags: [Auth]
 *     responses:
 *       401:
 *         description: Erro na autenticação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sorry, but there was an error during authentication. Please try again.
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Realiza o logout do usuário
 *     description: Encerra a sessão do usuário autenticado removendo os cookies de autenticação
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       500:
 *         description: Erro ao realizar logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sorry, but there was an error during logout
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra usuário com email e senha
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "minhaSenhaSegura"
 *     responses:
 *       201:
 *         description: Usuário registrado e autenticado (cookies setados)
 *       409:
 *         description: Email já está em uso
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login com email e senha
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@example.com
 *               password:
 *                 type: string
 *                 example: "minhaSenhaSegura"
 *     responses:
 *       200:
 *         description: Autenticado com sucesso (cookies setados)
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renova o access token
 *     description: Usa o refresh token (cookie httpOnly) para gerar um novo access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access token renovado
 *       401:
 *         description: Não autenticado
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Retorna o usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       401:
 *         description: Não autenticado
 */
