import cors from "cors";

// Configurar CORS con opciones personalizadas
export const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:3000", // Especifica el origen permitido
    methods: "GET, POST, PUT, DELETE", // Especifica los métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Especifica los encabezados permitidos
    credentials: true,
    // exposedHeaders: ["Content-Security-Policy"],
  };