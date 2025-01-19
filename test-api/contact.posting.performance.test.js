const request = require('supertest');
const agent = request.agent('http://127.0.0.1:3000');
const { measureTestPerformance, performanceResults, DURATION } = require('./test.utils');

beforeAll(async () => {
    const response = await agent.get('/login').query({ name: 'admin', password: 'admin' });
    agent.set('authorization', response.body.token);
});

jest.setTimeout(DURATION + 60000);

describe('Contact Posting Performance', () => {
    it('should measure contact posting performance', async () => {
        await measureTestPerformance('Contact Posting', async () => {
            await agent
                .post('/contact')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    mobilePhone: '1234567890',
                    email: 'john.doe@example.com',
                    arrivedAt: new Date(),
                    departureAt: new Date(),
                    message: 'Test contact',
                    createdAt: new Date()
                })
                .expect(200);
        });
    });
});

afterAll(() => {
    const { time, call } = performanceResults['Contact Posting'];
    console.log(`- POST /contact: ${time} ms (${call} requests)`);
});
