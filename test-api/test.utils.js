const app = 'http://localhost:3000';
const TEST_DURATION_IN_MS = 10 * 60 * 1000; // 10 minutes
const NUMBER_OF_USERS = 5; // 5 Users

const executeEndpointTest = async (testFn, duration) => {
    const endTime = Date.now() + duration;
    const promises = [];

    const executeForUser = async () => {
        while (Date.now() < endTime) {
            const start = Date.now();
            try {
                await testFn();
            } catch (error) {
                throw error;
            } finally {
                const responseTime = Date.now() - start;
                global.responseTimes.push(responseTime);
            }
        }
    };

    for (let i = 0; i < NUMBER_OF_USERS; i++) {
        promises.push(executeForUser());
    }

    await Promise.all(promises);
};

module.exports = {
    app,
    TEST_DURATION_IN_MS,
    executeEndpointTest
};