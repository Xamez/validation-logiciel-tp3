const request = require('supertest');
const { app, TEST_DURATION_IN_MS, executeEndpointTest } = require('../test.utils');

describe('GET /auth', () => {
    jest.setTimeout(TEST_DURATION_IN_MS + 10000);
    it('should return 200 and respond with JSON under load', async () => {
        await executeEndpointTest(async () => {
            const response = await request(app).get('/auth').set('authorization', global.authToken);
            expect(response.status).toBe(200);
        }, TEST_DURATION_IN_MS);
    });
});