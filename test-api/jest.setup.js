const request = require('supertest');

const app = 'http://localhost:3000';
global.responseTimes = [];

beforeAll(async () => {
    const loginRequest = await request(app).get('/login/').query({ name: "admin", password: "admin" });
    expect(loginRequest.status).toBe(200);
    global.authToken = loginRequest.body.token;
});

afterAll(() => {
    const totalResponses = global.responseTimes.length;
    if (totalResponses === 0) {
        console.log("No responses recorded");
        return;
    }
    const averageResponseTime = responseTimes.reduce((a, b) => a + b) / totalResponses;
    const maxResponseTime = Math.max(...responseTimes);
    const minResponseTime = Math.min(...responseTimes);
    console.log(`Total responses: ${totalResponses}\nAverage response time: ${averageResponseTime} ms\nMax response time: ${maxResponseTime} ms\nMin response time: ${minResponseTime} ms`);
});
