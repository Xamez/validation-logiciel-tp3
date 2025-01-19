const request = require('supertest');
const { app, TEST_DURATION_IN_MS, executeEndpointTest } = require('../test.utils');

describe('POST /feedback', () => {
    jest.setTimeout(TEST_DURATION_IN_MS + 10000);
    it('should create feedback and return 200 under load', async () => {
        await executeEndpointTest(async () => {
            const data = { name: 'Jean', message: 'Marie' };
            const response = await request(app)
                .post('/feedback')
                .set('authorization', global.authToken)
                .send(data);
            expect(response.status).toBe(200);
        }, TEST_DURATION_IN_MS);
    });
});

describe('GET /feedback', () => {
    jest.setTimeout(TEST_DURATION_IN_MS + 10000);
    it('should return a list of feedbacks and respond with JSON under load', async () => {
        await executeEndpointTest(async () => {
            const response = await request(app)
                .get('/feedback')
                .set('authorization', global.authToken);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        }, TEST_DURATION_IN_MS);
    });
});

describe('DELETE /feedback/', () => {
    jest.setTimeout(TEST_DURATION_IN_MS + 10000);
    it('should delete a feedback and return 200 (does not exists) under load', async () => {
        await executeEndpointTest(async () => {
            const response = await request(app)
                .delete('/feedback?id=unknown-id')
                .set('authorization', global.authToken);
            expect(response.status).toBe(200);
        }, TEST_DURATION_IN_MS);
    });
});