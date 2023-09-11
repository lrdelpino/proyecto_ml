import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    info: {
        title: 'Prueba meli',
        version: 'v1.0.0',
        description: 'Prueba de proyecto para meli',
    },
    openapi: '3.0.0',
    basePath: '/',
};

const options = {
    swaggerDefinition,
    apis: ['swagger/docs/**/specification.yaml'],
};
const swaggerSpec = swaggerJSDoc(options);

export default (path: any, app: any) => app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));