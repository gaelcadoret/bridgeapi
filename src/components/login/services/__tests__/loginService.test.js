const services = require("../../services");

describe("Services > login", () => {

    beforeEach(() => {
        Date.now = jest.fn(() => 1611826689192);
    });

    it("Should return an error in case of wrong login or password", async () => {
        expect(services.login("toto", "password")).toEqual({
            "error": "Invalid user or password!",
            "success": false,
            "timestamp": 1611826689192
        });
    });

    it("Should return a success response in case of good login or password", async () => {
        expect(services.login("BankinUser", "12345678")).toEqual({
            "data": "Welcome BankinUser",
            "success": true,
            "timestamp": 1611826689192
        });
    });
});
