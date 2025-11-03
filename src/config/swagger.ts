import swaggerJsdoc from 'swagger-jsdoc';

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
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
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
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);
