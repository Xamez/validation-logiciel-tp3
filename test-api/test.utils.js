const DURATION = 1 * 60 * 1000;
const USERS = 500;

const performanceResults = {};

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
    const userTasks = Array.from({ length: USERS }, () =>
        runTestWhile(testFunction)
    );

    const results = await Promise.all(userTasks);
    const allResponseTimes = results.flat();

    const total = allResponseTimes.reduce((sum, time) => sum + time, 0);
    const average = total / allResponseTimes.length;

    performanceResults[routeName] = {
        call: allResponseTimes.length,
        time: average.toFixed(2)
    };
    return average;
}

module.exports = {
    measureTestPerformance,
    performanceResults,
    DURATION
}