const request = require('supertest');
const agent = request.agent('http://127.0.0.1:3000');
const { measureTestPerformance, performanceResults, DURATION } = require('./test.utils');

beforeAll(async () => {
    const response = await agent.get('/login').query({ name: 'admin', password: 'admin' });
    agent.set('authorization', response.body.token);
});

jest.setTimeout(DURATION + 60000);

describe('Contact Fetching Performance', () => {
    it('should measure contact fetching performance', async () => {
        await measureTestPerformance('Contact Fetching', async () => {
            await agent
                .get('/contacts')
                .expect(200);
        });
    });
});

afterAll(() => {
    const { time, call } = performanceResults['Contact Fetching'];
    console.log(`- GET /contacts: ${time} ms (${call} requests)`);
});
