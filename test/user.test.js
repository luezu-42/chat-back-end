const supertest = require("supertest");

const app = require("../src/app.js");
const request = supertest(app);

let mainUser = { name: "TESTE", email: "TESTE@GMAIL.COM", password: 54321 };

beforeAll(() => {
    return request.post("/user")
    .send(mainUser)
    .then(res => {})
    .catch(err => {console.log(err)})
})
//
//afterAll(() => {
//    return request.delete(`/user/delete/${mainUser.email}`)
//    .then(err => {})
//    .catch(err => {console.log(err)})
//})

describe("Cadastro de usuário", () => {
  test("Deve cadastrar um usuário com sucesso", () => {
    let time = Date.now();
    let email = `${time}@gmail.com`;
    const user = { name: "Leonardo", email, password: "12345" };

    return request
      .post("/user")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(email);
      })
      .catch((err) => {
        fail(err);
      });
  });

  test("Impedir que o usuário se cadastre com campos vazios", () => {
    const user = { name: "", email: "", password: "" };

    return request
      .post("/user")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      })
      .catch((err) => {
        fail(err);
      });
  });

  test("Impedir o cadastro de email repetido", () => {
    let time = Date.now();
    let email = `${time}@gmail.com`;
    const user = { name: "Leonardo", email, password: "12345" };

    return request
      .post("/user")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(email);

        return request
          .post("/user")
          .send(user)
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual("Email já cadastrado!");
          })
          .catch((err) => {
            fail(err);
          });
      })
      .catch((err) => {
        fail(err);
      });
  });
});

describe("Autenticação", () => {
  test("Deve retornar um token quando logar", () => {
      let teste = {email: "teste@gmail.com1", password: "teste" };
    return request
      .post("/user/auth")
      .send(teste)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeDefined();
      })
      .catch((err) => {
        fail(err);
      });
  });
});
