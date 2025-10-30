import express, { type Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from '@/routes/users.route.js';
import authRoutes from '@/routes/auth.route.js';
import session from 'express-session';
import passport from '@/config/passport.js';
import tasklistsRoutes from '@/routes/tasklists.route.js';

const app: Application = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (_req, res) => {
  res.json({
    message: "Hello World, i'm alive!",
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime().toLocaleString('pt-BR'),
    environment: process.env.NODE_ENV || 'development',
    node_version: process.version,
  });
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasklist', tasklistsRoutes);

export default app;
