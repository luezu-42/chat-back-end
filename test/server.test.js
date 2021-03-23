const supertest = require("supertest");

const app = require("../src/app.js");
const request = supertest(app);

describe("teste de rotas", () => {
  test("Raiz do projeto", async () => {
    try {
      const res = await request.get("/")
      expect(res.status).toEqual(200)
    } catch (error) {
      fail(error)
    }
    
  });
});
