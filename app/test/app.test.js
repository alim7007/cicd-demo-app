const request = require("supertest");
const assert = require("assert");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

describe("Node.js App Basic Tests", () => {
  it("GET /health should return 200 OK", (done) => {
    request(BASE_URL)
      .get("/health")
      .expect(200)
      .expect((res) => {
        assert(
          res.body.status === "ok",
          "Health endpoint should return status ok"
        );
      })
      .end(done);
  });

  it("GET / should return HTML page", (done) => {
    request(BASE_URL).get("/").expect("Content-Type", /html/).expect(200, done);
  });
});
