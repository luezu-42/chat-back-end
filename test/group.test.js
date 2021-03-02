const supertest = require("supertest");

const app = require("../src/app.js");
const request = supertest(app);

describe("Teste na rota de grupos", () => {

    test("Grupo deve ser criado" , () => {
        let date = Date.now();
        let group = `Grupo ${date.toString()}`
        return request.post("/").send({name: group}).then(res => {
            expect(res.statusCode).toEqual(200);
        }).catch(err => {
            fail(err)
        })
    })

    test("Retorno de todos os grupos", () => {
        return request.get("/").then(res => {
            expect(res.statusCode).toEqual(200);
        }).catch(err => {
            fail(err)
        })
    })
})