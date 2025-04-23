import swaggerJsDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Full Swagger config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API documentation for the Task Manager app",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // This is the key part that fixes it
  apis: ["./src/features/**/routes.ts"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;