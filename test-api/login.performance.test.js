const request = require('supertest');
const agent = request.agent('http://127.0.0.1:3000');
const { measureTestPerformance, performanceResults, DURATION } = require('./test.utils');

beforeAll(async () => {
    const response = await agent.get('/login').query({ name: 'admin', password: 'admin' });
    agent.set('authorization', response.body.token);
});

jest.setTimeout(DURATION + 10000);

describe('Login Performance', () => {
    it('should measure login performance', async () => {
        await measureTestPerformance('Login', async () => {
            await agent
                .get('/login')
                .query({ name: 'admin', password: 'admin' })
                .expect(200);
        });
    });
});

afterAll(() => {
    const { time, call } = performanceResults['Login'];
    console.log(`- GET /login: ${time} ms (${call} requests)`);
});
