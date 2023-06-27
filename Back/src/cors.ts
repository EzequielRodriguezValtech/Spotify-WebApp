export const corsOptionsWithExpress = {
  origin: 'http://localhost:3000', // URL de FE
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};