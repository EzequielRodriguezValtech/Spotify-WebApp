import request from "supertest";
import { initializeApp, createServer } from "../app"; // Asegúrate de importar el archivo de la aplicación correctamente

describe("Pruebas de rutas de la aplicación", () => {
  let app: any;
  let server: any;

  beforeAll(() => {
    // Configura la aplicación y el servidor antes de las pruebas
    app = initializeApp(app);
    server = createServer(app, 8000);
  });

  afterAll((done) => {
    // Cierra el servidor después de todas las pruebas
    server.close(done);
  });

  // Prueba para la ruta principal
  it("debe responder correctamente a la ruta principal", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("¡Bienvenido a mi aplicación!");
  });

  // Prueba para la ruta de inicio de sesión de Spotify
  it("debe redirigir correctamente a la ruta de inicio de sesión de Spotify", async () => {
    const response = await request(app).get("/auth/spotify");
    expect(response.status).toBe(302); // Redirección
    expect(response.header.location).toContain("/auth/spotify/callback");
  });

  // Prueba para la ruta de redireccionamiento después de la autenticación
  it("debe redirigir correctamente después de la autenticación de Spotify", async () => {
    const response = await request(app).get("/auth/spotify/callback");
    expect(response.status).toBe(302); // Redirección
    expect(response.header.location).toBe("http://localhost:3000/profile");
  });
  
});
