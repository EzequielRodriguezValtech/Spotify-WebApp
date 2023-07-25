import { describe, beforeEach, it, expect, afterEach } from "@jest/globals";
import request from "supertest";
import express from "express";
import { initializeApp, createServer } from "../src/app";

describe("Test de la aplicación", () => {
  let app: express.Express;
  let server: any;

  beforeEach(() => {
    app = express();
    initializeApp(app);
    server = createServer(app, 0); // El segundo argumento es el puerto, pero usamos 0 para que el sistema operativo asigne un puerto disponible automáticamente.
  });

  afterEach((done) => {
    server.close(done);
  });

  it("Debería devolver un status 200 para una solicitud GET a /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  it("Debería devolver un status 404 para una solicitud GET a una ruta no existente", async () => {
    const response = await request(app).get("/ruta-no-existente");
    expect(response.status).toBe(404);
  });
});