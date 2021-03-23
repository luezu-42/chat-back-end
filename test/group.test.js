const supertest = require("supertest");

const app = require("../src/app.js");
const request = supertest(app);

describe("Teste na rota de grupos", () => {
  test("Grupo deve ser criado", async () => {
    let date = Date.now();
    let group = `Grupo ${date.toString()}`;
    try {
      const res = await request.post("/").send({ name: group });
      expect(res.statusCode).toEqual(200);
    } catch (error) {
      fail(error);
    }
  });

  test("Retorno de todos os grupos", async () => {
    try {
      const res = await request.get("/");
      expect(res.statusCode).toEqual(200);
    } catch (error) {
      fail(error);
    }
  });
});
