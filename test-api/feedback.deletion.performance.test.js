const request = require('supertest');
const agent = request.agent('http://127.0.0.1:3000');
const { measureTestPerformance, performanceResults, DURATION } = require('./test.utils');

beforeAll(async () => {
    const response = await agent.get('/login').query({ name: 'admin', password: 'admin' });
    agent.set('authorization', response.body.token);
});

jest.setTimeout(DURATION + 60000);

describe('Feedback Deletion Performance', () => {
    it('should measure feedback deletion performance', async () => {
        await measureTestPerformance('Feedback Deletion', async () => {
            await agent
                .delete('/feedback')
                .send({ id: '12345' })
                .expect((res) => {
                    if (![200, 404].includes(res.status)) { // Can return 403 because we are trying to delete a non-existing feedback
                        throw new Error(`Unexpected status code: ${res.status}`);
                    }
                });
        });
    });
});

afterAll(() => {
    const { time, call } = performanceResults['Feedback Deletion'];
    console.log(`- DELETE /feedback: ${time} ms (${call} requests)`);
});
