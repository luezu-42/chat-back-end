const supertest = require("supertest");
const mongoose = require("mongoose");

const User = mongoose.model("User", require("../src/models/User"));
const app = require("../src/app.js");
const request = supertest(app);

let mainUser = { name: "TESTE", email: "TESTE@GMAIL.COM", password: 54321 };
let teste = { email: "teste@gmail.com1", password: "teste" };

beforeAll(async () => {
  try {
    await request
      .post("/user")
      .send({ name: "teste", email: "teste@gmail.com1", password: "teste" });
  } catch (error) {
    fail(error);
  }
});

afterAll(async () => {
  try {
    await request.delete("/user/delete/teste@gmail.com1");
  } catch (error) {
    fail(error);
  }
});

describe("Cadastro de usuário", () => {
  test("Deve cadastrar um usuário com sucesso", async () => {
    const time = Date.now();
    const email = `${time}@gmail.com`;
    const user = { name: "Leonardo", email, password: "12345" };

    try {
      const res = await request.post("/user").send(user);
      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toEqual(email);
    } catch (error) {
      fail(error);
    }
  });

  test("Impedir que o usuário se cadastre com campos vazios", async () => {
    const user = { name: "", email: "", password: "" };
    try {
      const res = await request.post("/user").send(user);
      expect(res.statusCode).toEqual(400);
    } catch (error) {
      fail(error);
    }
  });

  test("Impedir o cadastro de email repetido", async () => {
    const time = Date.now();
    const email = `${time}@gmail.com`;
    const user = { name: "Leonardo", email, password: "12345" };

    try {
      const res = await request.post("/user").send(user);
      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toEqual(email);
    } catch (error) {
      fail(error);
    }
    try {
      const res = await request.post("/user").send(user);
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual("Email já cadastrado!");
    } catch (error) {
      fail(error);
    }
  });
});

describe("Autenticação", () => {
  test("Deve retornar um token quando logar", async () => {
    try {
      const res = await request.post("/user/auth").send(teste);
      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
    } catch (error) {
      fail(error);
    }
  });
});
