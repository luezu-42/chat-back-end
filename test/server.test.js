const supertest = require("supertest");

const app = require("../src/app.js");
const request = supertest(app);

describe("teste de rotas", () => {
  test("Raiz do projeto", () => {
    return request
      .get("/")
      .then((res) => {
        const status = res.statusCode;
        expect(status).toEqual(200);
      })
      .catch((err) => {
        fail(err);
      });
  });
});
