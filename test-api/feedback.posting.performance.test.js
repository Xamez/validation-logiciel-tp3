const request = require('supertest');
const agent = request.agent('http://127.0.0.1:3000');
const { measureTestPerformance, performanceResults, DURATION } = require('./test.utils');

beforeAll(async () => {
    const response = await agent.get('/login').query({ name: 'admin', password: 'admin' });
    agent.set('authorization', response.body.token);
});

jest.setTimeout(DURATION + 60000);

describe('Feedback Posting Performance', () => {
    it('should measure feedback posting performance', async () => {
        await measureTestPerformance('Feedback Posting', async () => {
            await agent
                .post('/feedback')
                .send({
                    name: 'John',
                    message: 'Test feedback',
                    createdAt: new Date()
                })
                .expect(200);
        });
    });
});

afterAll(() => {
    const { time, call } = performanceResults['Feedback Posting'];
    console.log(`- POST /feedback: ${time} ms (${call} requests)`);
});
