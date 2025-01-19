## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run application**:
   ```bash
   docker compose up
   npm run api-start
   ```

3. **Run load testing tests**:
   ```bash
   npm run api-test
   ```

## Test Results

| **Number of Users** | **Average Response Time** | **Minimum Response Time** | **Maximum Response Time** |
|---------------------|---------------------------|---------------------------|---------------------------|
| 5                   | 34 ms                     | 9 ms                      | 37 ms                     |
| 100                 | 653 ms                    | 127 ms                    | 61474 ms                  |
| 500                 | 3656 ms                   | 633 ms                    | 229579 ms                 |
| 1000                | 13083 ms                  | 1624 ms                   | 321993 ms                 |

> NOTE: Occasionally, the api crashes due to a heap overrun during testing, causing an error in subsequent tests.

We can see that as the load increases, delays increase exponentially, as well as ram usage
