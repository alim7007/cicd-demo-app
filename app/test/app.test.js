// const request = require("supertest");

// describe("Node.js Profile App Basic Tests", () => {
//   it("GET /health should return 200 OK", (done) => {
//     request("http://localhost:3000").get("/health").expect(200, done);
//   });

//   it("GET / should return HTML", (done) => {
//     request("http://localhost:3000")
//       .get("/")
//       .expect("Content-Type", /html/)
//       .expect(200, done);
//   });

//   it("GET /profile-picture should return image", (done) => {
//     request("http://localhost:3000")
//       .get("/profile-picture")
//       .expect("Content-Type", /image/)
//       .expect(200, done);
//   });
// });

const request = require("supertest");
const assert = require("assert");

const AUTH_USER = "admin";
const AUTH_PASS = "pass";

describe("Mongo Express UI Tests with Auth", () => {
  it("GET / should return 200 and HTML with auth", (done) => {
    request("http://localhost:8080")
      .get("/")
      .auth(AUTH_USER, AUTH_PASS)
      .expect("Content-Type", /html/)
      .expect(200)
      .end(done);
  });

  it("GET / should contain 'mongo-express'", (done) => {
    request("http://localhost:8080")
      .get("/")
      .auth(AUTH_USER, AUTH_PASS)
      .expect(200)
      .expect((res) => {
        assert(
          res.text.includes("mongo-express"),
          "Response does not include 'mongo-express'"
        );
      })
      .end(done);
  });
});
