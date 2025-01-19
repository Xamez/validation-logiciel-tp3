const request = require('supertest');
const { app, TEST_DURATION_IN_MS, executeEndpointTest } = require('../test.utils');

describe('POST /contact', () => {
    jest.setTimeout(TEST_DURATION_IN_MS + 10000);
    it('should create contact and return 200 under load', async () => {
        await executeEndpointTest(async () => {
            const data = { firstName: 'Jean', lastName: 'Marie', message: 'Message', departureAt: new Date(), arrivedAt: new Date(), email: 'Jean.Marie@gmail.com', mobilePhone: '911' };
            const response = await request(app)
                .post('/contact')
                .set('authorization', global.authToken)
                .send(data);
            expect(response.status).toBe(200);
        }, TEST_DURATION_IN_MS);
    });
});

describe('GET /contacts', () => {
    jest.setTimeout(TEST_DURATION_IN_MS + 10000);
    it('should return a list of contacts and respond with JSON under load', async () => {
        await executeEndpointTest(async () => {
            const response = await request(app)
                .get('/contacts')
                .set('authorization', global.authToken);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        }, TEST_DURATION_IN_MS);
    });
});

describe('DELETE /contact/:id', () => {
    jest.setTimeout(TEST_DURATION_IN_MS + 10000);
    it('should delete a contact and return 403 (does not exists) under load', async () => {
        await executeEndpointTest(async () => {
            const response = await request(app)
                .delete('/contact/unknown-id')
                .set('authorization', global.authToken);
            expect(response.status).toBe(403);
        }, TEST_DURATION_IN_MS);
    });
});