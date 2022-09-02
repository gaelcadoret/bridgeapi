const request = require("supertest");

const initApp = require("..");

describe("routes", () => {
  describe("/healthz", () => {
    it("Should return success message", async () => {
      Date.now = jest.fn(() => "1611826689192");

      const app = await initApp({});

      const response = await request(app).get(`/healthz`).send();

      expect(response.body).toEqual({
        success: true,
        data: "Welcome to this awesome api.",
        timestamp: "1611826689192",
      });
    });

    it("Should return error message for unknown route", async () => {
      Date.now = jest.fn(() => "1611826689192");

      const app = await initApp({});

      const response = await request(app).get(`/toto`).send();

      expect(response.body).toEqual({
        success: false,
        error: "/toto can't be found !",
        timestamp: "1611826689192",
      });

      expect(response.statusCode).toBe(404);
    });
  });
});
