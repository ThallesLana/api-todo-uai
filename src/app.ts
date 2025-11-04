import express, { type Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from '@/routes/users.route.js';
import authRoutes from '@/routes/auth.route.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from '@/config/passport.js';
import tasklistsRoutes from '@/routes/tasklists.route.js';
import tasksRoutes from '@/routes/tasks.route.js';
import { specs } from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import infoRoutes from '@/routes/info.route.js';

const app: Application = express();
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGINS?.split(',') || [] : '*',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
  max: Number(process.env.RATE_LIMIT_MAX),
  message: 'So many requests from this IP, try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(express.json({ limit: process.env.LIMIT_BODY }));
app.use(express.urlencoded({ extended: true, limit: process.env.LIMIT_URL }));

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI!,
      touchAfter: 24 * 3600,
      ttl: 24 * 60 * 60,
      autoRemove: 'native',
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', infoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasklist', tasklistsRoutes);
app.use('/api/tasks', tasksRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
