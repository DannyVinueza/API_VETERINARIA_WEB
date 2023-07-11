import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Veterinary Managment API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://veterinary-managment.onrender.com/',
      },
    ],
  },
  apis: ['../routers/*.js', '../database.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocsIN = (app)=>{
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

const swaggerDocs = (req, res) => {
  res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
    console.log('Está habilitada en el puerto');
};

export { swaggerDocs, 
         swaggerDocsIN 
};

