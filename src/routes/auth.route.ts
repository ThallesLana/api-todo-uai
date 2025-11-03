import { Router } from 'express';
import passport from '@/config/passport.js';
import { apiResponse } from '@/responses/apiResponse.js';

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
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failure',
  }),
  (_req, res) => {
    res.redirect('/api/users/hello-new-user');
  },
);

router.get('/login-failure', (_req, res) => {
  apiResponse.unauthorized(
    res,
    'Sorry, but there was an error during authentication. Please try again.',
  );
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      apiResponse.serverError(
        res,
        'Sorry, but there was an error during logout. Message error: ' + err,
      );
    }

    apiResponse.success(res, null, 'Logout successful');
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
 *   get:
 *     summary: Realiza o logout do usuário
 *     description: Encerra a sessão do usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
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
