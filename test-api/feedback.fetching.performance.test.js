const request = require('supertest');
const agent = request.agent('http://127.0.0.1:3000');
const { measureTestPerformance, performanceResults, DURATION } = require('./test.utils');

beforeAll(async () => {
    const response = await agent.get('/login').query({ name: 'admin', password: 'admin' });
    agent.set('authorization', response.body.token);
});

jest.setTimeout(DURATION + 60000);


describe('Feedback Fetching Performance', () => {
    it('should measure feedback fetching performance', async () => {
        await measureTestPerformance('Feedback Fetching', async () => {
            await agent.get('/feedback').expect(200);
        });
    });
});

afterAll(() => {
    const { time, call } = performanceResults['Feedback Fetching'];
    console.log(`- GET /feedback: ${time} ms (${call} requests)`);
});
