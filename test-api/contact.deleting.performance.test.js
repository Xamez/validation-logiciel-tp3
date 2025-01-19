const request = require('supertest');
const agent = request.agent('http://127.0.0.1:3000');
const { measureTestPerformance, performanceResults, DURATION } = require('./test.utils');

beforeAll(async () => {
    const response = await agent.get('/login').query({ name: 'admin', password: 'admin' });
    agent.set('authorization', response.body.token);
});

jest.setTimeout(DURATION + 60000);

describe('Contact Deletion Performance', () => {
    it('should measure contact deletion performance', async () => {
        await measureTestPerformance('Contact Deletion', async () => {
            await agent
                .delete('/contact/12345')
                .expect((res) => {
                    if (![200, 403].includes(res.status)) { // Can return 403 because we are trying to delete a non-existing contact
                        throw new Error(`Unexpected status code: ${res.status}`);
                    }
                });
        });
    });
});

afterAll(() => {
    const { time, call } = performanceResults['Contact Deletion'];
    console.log(`- DELETE /contact: ${time} ms (${call} requests)`);
});
