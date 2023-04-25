const request = require("supertest");
const { app } = require("../../app");

it("should respond", async () => {
    const response = await request(app).get("/test").send().expect(200);

    expect(response.text).toEqual("Hey, this is ok!");
});
