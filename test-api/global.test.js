const supertest = require('supertest');

const agent = supertest.agent('http://127.0.0.1:3000');

beforeAll(async () => {
    const response = await agent.get('/login').query({name: 'admin', password: 'admin'});
    agent.set('authorization', response.body.token);
});

function generateRequest(routeIndex) {
    switch (routeIndex) {
        case 0:
            return agent.get('/login').query({name: 'admin', password: 'admin'}).expect(200);
        case 1:
            return agent.delete('/feedback').send({id: '12345'}).expect((res) => {
                if (![200, 404].includes(res.status)) {
                    throw new Error(`Unexpected status code: ${res.status}`);
                }
            });
        case 2:
            return agent.get('/feedback').expect(200);
        case 3:
            return agent.post('/feedback').send({
                name: 'John',
                message: 'Test feedback',
                createdAt: new Date()
            }).expect(200);
        case 4:
            return agent.delete('/contact/12345').expect((res) => {
                if (![200, 403].includes(res.status)) {
                    throw new Error(`Unexpected status code: ${res.status}`);
                }
            });
        case 5:
            return agent.get('/contacts').query({
                firstName: 'John',
                lastName: 'Doe',
                mobilePhone: '1234567890',
                email: 'john.doe@example.com',
                arrivedAt: new Date(),
                departureAt: new Date(),
                message: 'Test contact',
                createdAt: new Date()
            }).expect(200);
        default:
            throw new Error('Invalid route index');
    }
}

describe('API Load Tests', () => {
    const duration = 1 * 60 * 1000; // 10 minutes
    const parallelRequests = 1000;

    it('should handle high load for 10 minutes', async () => {
        const startTime = Date.now();

        while (Date.now() - startTime < duration) {
            const promises = Array.from({length: parallelRequests}, (_, i) => {
                const routeIndex = i % 6;
                generateRequest(routeIndex);
            });

            try {
                await Promise.all(promises);
            } catch (err) {
                console.error('Error:', err);
                throw err;
            }
        }
    }, duration + 10000);
});
