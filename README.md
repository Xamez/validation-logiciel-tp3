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

### For 1000 users in parallel


| Endpoint            | Average Response Time | Request per Second (rps) | Total Requests |
|---------------------|-----------------------|--------------------------|----------------|
| **GET /login**       | 2992.05 ms           | 3,34 rps                 | 10000          |
| **DELETE /feedback** | 5786.16 ms           | 1,84 rps                 | 10663          |
| **GET /feedback**    | 5741.51 ms           | 1,88 rps                 | 10768          |
| **POST /feedback**   | 5953.65 ms           | 1,73 rps                 | 10307          |
| **DELETE /contact**  | 5901.34 ms           | 1,77 rps                 | 10449          |
| **POST /contact**    | 63756 ms             | 0,16 rps                 | N/A            |
| **GET /contacts**    | 6361.54 ms           | 1,53 rps                 | 9717           |

### For 500 users in parallel

| Endpoint             | Average Response Time | Request per Second (rps) | Total Requests |
|----------------------|-----------------------|--------------------------|----------------|
| **GET /login**       | 3144 ms               | 3,07 rps                 | 9638           |
| **DELETE /feedback** | 3416 ms               | 2,62 rps                 | 8945           |
| **GET /feedback**    | 3270 ms               | 2,85 rps                 | 9315           |
| **POST /feedback**   | 3395 ms               | 2,65 rps                 | 8996           |
| **DELETE /contact**  | 2898 ms               | 3,62 rps                 | 10500          |
| **POST /contact**    | 2813 ms               | 3,84 rps                 | 10801          |
| **GET /contacts**    | N/A                   | 3.47 rps                 | N/A            |
