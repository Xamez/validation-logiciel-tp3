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
| **GET /login**       | 2992.05 ms            | 6.71 rps                 | 20422          |
| **DELETE /feedback** | 5786.16 ms            | 6.70 rps                 | 10663          |
| **GET /feedback**    | 5741.51 ms            | 6.69 rps                 | 10768          |
| **POST /feedback**   | 5953.65 ms            | 6.70 rps                 | 10307          |
| **DELETE /contact**  | 5901.34 ms            | 6.70 rps                 | 10449          |
| **POST /contact**    | 63756 ms              | 6.67 rps                 | N/A            |
| **GET /contacts**    | 6361.54 ms            | 6.57 rps                 | 9717           |

### For 500 users in parallel

| Endpoint            | Average Response Time | Request per Second (rps) | Total Requests |
|---------------------|-----------------------|--------------------------|----------------|
| **GET /login**       | 3042.44 ms            | 3.29 rps                 | 10000          |
| **DELETE /feedback** | 2849.67 ms            | 3.73 rps                 | 10625          |
| **GET /feedback**    | 2926.55 ms            | 3.57 rps                 | 10404          |
| **POST /feedback**   | 2910.71 ms            | 3.61 rps                 | 10480          |
| **DELETE /contact**  | 2641.10 ms            | 4.10 rps                 | 11501          |
| **GET /contacts**    | 2879.01 ms            | 3.47 rps                 | 10548          |


