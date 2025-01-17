const request = require('supertest');
const agent = request.agent('http://127.0.0.1:3000');

const DURATION = 1 * 60 * 1000; // 1 minute
const USERS = 500;

const performanceResults = {};

beforeAll(async () => {
    const response = await agent.get('/login').query({ name: 'admin', password: 'admin' });
    agent.set('authorization', response.body.token);
});

async function runTestWhile(testFunction) {
    const start = Date.now();
    const responseTimes = [];

    while (Date.now() - start < DURATION) {
        const testStart = Date.now();
        await testFunction();
        const testEnd = Date.now();
        responseTimes.push(testEnd - testStart);
    }

    return responseTimes;
}

async function measureTestPerformance(routeName, testFunction) {
    const promises = Array.from({ length: USERS }, () =>
        runTestWhile(testFunction)
    );

    const results = await Promise.all(promises);
    const allResponseTimes = results.flat();

    const total = allResponseTimes.reduce((sum, time) => sum + time, 0);
    const average = total / allResponseTimes.length;

    performanceResults[routeName] = {
        call: allResponseTimes.length,
        time: average.toFixed(2)
    };
    return average;
}

describe('Performance Tests', () => {

    jest.setTimeout(DURATION + 50000);

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

    describe('Feedback Fetching Performance', () => {
        it('should measure feedback fetching performance', async () => {
            await measureTestPerformance('Feedback Fetching', async () => {
                await agent.get('/feedback').expect(200);
            });
        });
    });

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

    describe('Contact Inserting Performance', () => {
        it('should measure contact inserting performance', async () => {
            await measureTestPerformance('Contact Fetching', async () => {
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
        // Calculate the overall average
        const routeAverages = Object.values(performanceResults).map(Number);
        const overallAverage =
            routeAverages.reduce((sum, avg) => sum + avg, 0) / routeAverages.length;

        console.log('\nPerformance Results:');
        for (const [route, avg] of Object.entries(performanceResults)) {
            console.log(`- ${route}: ${avg.time} ms (${avg.call} requests)`);
        }
        console.log(`\nOverall Average Response Time: ${overallAverage.toFixed(2)} ms`);
    });
});
