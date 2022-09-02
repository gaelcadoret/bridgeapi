const request = require("supertest");

const initApp = require("../../../..");
const services = require("../../services");

jest.mock("../../services");

describe("Controllers > login", () => {
  let app;

  beforeAll(async () => {
    app = await initApp();
  });

  beforeEach(() => {
    Date.now = jest.fn(() => "1611826689192");
  });

  afterEach(() => {
    services.login.mockReset();
    services.login.mockRestore();
  });

  it("Should not call associated service 'login' in case of empty body", async () => {
    await request(app).post(`/login`).send();

    expect(services.login).toHaveBeenCalledTimes(0);
  });

  it("Should call associated service 'login' in case of valid body", async () => {
    await request(app).post(`/login`).send({
      "user": "BankinUser",
      "password": "12345678"
    });

    expect(services.login).toHaveBeenCalledTimes(1);
  });

  it("Should return error for login service error response", async () => {
    services.login.mockResolvedValue({ success: false });

    const response = await request(app).post(`/login`).send();

    expect(response.body).toEqual({
      success: false,
      error: "Something get wrong with the request",
      timestamp: "1611826689192",
    });
  });

  it("Should return HTTP code 400 in case of bad request like missing property", async () => {
    const response = await request(app).post(`/login`).send({
      "user": "BankinUser",
    });

    expect(response.body).toEqual({
      success: false,
      error: "Something get wrong with the request",
      timestamp: "1611826689192",
    });

    expect(response.statusCode).toBe(400);
  });

  it("Should return HTTP code 401 in case of wrong login or password", async () => {
    services.login.mockResolvedValue({ success: false });

    const response = await request(app).post(`/login`).send({
      "user": "BankinUser",
      "password": "12345678"
    });

    expect(response.body).toEqual({
      success: false,
      error: "401 Unauthorized",
      timestamp: "1611826689192",
    });

    expect(response.statusCode).toBe(401);
  });
});
