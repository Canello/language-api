const request = require("supertest");

const { app } = require("../app");

beforeAll(async () => console.log(process.env.PORT));
