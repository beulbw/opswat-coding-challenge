import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.1",
  info: {
    title: "REST API for User and Article Management",
    version: "1.0.0",
    description: "This is a REST API application to manage Users and Articles.",
  },
  components: {
    securitySchemes: {
      bearerToken: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/router/routes/*.ts"],
};

export const swaggerDocument = swaggerJSDoc(options);
