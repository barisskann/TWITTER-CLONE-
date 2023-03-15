const request = require("supertest");
const server = require("./api/server");
const db = require("./data/db-config");
const bcrypt = require("bcryptjs");
const jwtDecode = require("jwt-decode");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

test("[0] sanity check", () => {
  expect(true).not.toBe(false);
});

describe("index.js", () => {
  describe("[POST] /user/signup", () => {
    it("[1] signup da eksik bilgiler var.", async () => {
      const res = await request(server)
        .post("/user/signup")
        .send({ name: "sadi", surname: "saygı", password: "182481284" });
      expect(res.body.message).toMatch(/ksik Bilgiler/);
    }, 750);
    it("[2] dbde kayıtlı bir email var.", async () => {
      const res = await request(server).post("/user/signup").send({
        name: "sadi",
        surname: "susurluk",
        password: "124214",
        email: "bars_958@hotmail.com",
      });
      expect(res.body.message).toMatch(/KULLANICI BULUNMAKTADIR/);
    }, 750);
    it("[3] Başarılı bir şekilde kayıt oluyor", async () => {
      const res = await request(server).post("/user/signup").send({
        name: "saygı",
        surname: "sansar",
        password: "12345",
        email: "bars_95812@hotmail.com",
      });
      expect(res.body).toMatchObject({
        name: "saygı",
        surname: "sansar",
        email: "bars_95812@hotmail.com",
      });
    }, 1000);
  }, 750);
});
describe("index.js", () => {
  describe("[POST] /user/signin]", () => {
    test("[4] loginde eksik bilgiler", async () => {
      const res = await request(server)
        .post("/user/signin")
        .send({ username: "bob" });
      expect(res.body.message).toMatch(/Bilgileri Doldurunuz/i);
    }, 750);
    test("[5] dbde email kontrol", async () => {
      const res = await request(server)
        .post("/user/signin")
        .send({ email: "bars_9581@hotmail.com", password: "1234" });
      expect(res.body.message).toMatch(/Kullanıcı adı veye Parola HATALI/i);
    }, 750);
    test("[6] token kontrolü yapıldı", async () => {
      const res = await request(server)
        .post("/user/signin")
        .send({ email: "bars_958@hotmail.com", password: "19032008" });
      let decoded = jwtDecode(res.body);
      expect(decoded).toHaveProperty("user_id");
    }, 750);
  });
});
describe("index.js", () => {
  describe(" db sorguları ", () => {
    it("[7] db  get sorgusu atıyor mu ?", async () => {
      const data = await db("users")
        .where({ email: "bars_958@hotmail.com" })
        .first();
      expect(data).toBeTruthy();
    }, 750);
    it("[8] dbdeki passwordlar hashli mi ?", async () => {
      const data = await db("users")
        .where({ email: "bars_958@hotmail.com" })
        .first();
      expect(bcrypt.compareSync("19032008", data.password)).toBeTruthy();
    }, 750);
    it("[9] [GET]  db   doğru user geliyor mu ?", async () => {
      const data = await db("users")
        .where({ email: "bars_958@hotmail.com" })
        .first();
      expect(data).toMatchObject({ name: "Barış", surname: "kan" });
    }, 750);
  }, 750);
});
describe("index.js", () => {
  describe(" db sorguları ", () => {
    it("[10] db  Tokensiz giriş yapmamalı", async () => {
      const res = await request(server).get("/user/post");
      expect(res.body.message).toMatch(/Giriş yapmanız gerek/);
    }, 750);
    it("[11] geçersiz token girilirse doğru mesaj", async () => {
      const res = await request(server)
        .get("/user/post")
        .set("Authorization", "foobar");
      expect(res.body.message).toMatch(/geçersizdir/i);
    }, 750);
    it("[12] token geçerliyse doğru kullanıcı listesi", async () => {
      let res = await request(server)
        .post("/user/signin")
        .send({ email: "bars_958@hotmail.com", password: "19032008" });
      console.log(res.body);

      // res = await request(server)
      //   .get("/user/post")
      //   .set("Authorization", res.body);
      // expect(res.body).toMatchObject([
      //   { role_name: "admin", user_id: 1, username: "bob" },
      //   { role_name: "instructor", user_id: 2, username: "sue" },
      // ]);
    }, 1000);
  }, 750);
});
