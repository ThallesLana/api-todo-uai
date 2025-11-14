import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJsdoc from 'swagger-jsdoc';

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo UAI - API',
      version: '1.0.0',
      description:
        'É uma API REST de lista de tarefas com aquele jeitinho mineiro: simples, direto e sem enrolação. Permite criar e gerenciar listas personalizadas, organizar tarefas com cores diferentes e marcar o que já foi feito com um clique.',
      contact: {
        name: ': Thalles Lana',
        email: 'contato@thalles-lana.dev',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desenvolvimento',
      },
      {
        url: `${BASE_URL}`,
        description: 'Servidor de produção',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, '..', 'routes', '**', '*.{ts,js}')],
};

export const specs = swaggerJsdoc(options);
