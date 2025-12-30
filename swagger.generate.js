import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo UAI - API',
      version: '1.0.0',
      description:
        'É uma API REST de lista de tarefas com aquele jeitinho mineiro: simples, direto e sem enrolação. Permite criar e gerenciar listas personalizadas, organizar tarefas com cores diferentes e marcar o que já foi feito com um clique.',
      contact: {
        name: 'Thalles Lana',
        email: 'contato@thalles-lana.dev',
      },
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'access_token',
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

fs.writeFileSync('./dist/swagger.json', JSON.stringify(swaggerSpec, null, 2));
