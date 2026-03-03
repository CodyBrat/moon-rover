# Moon Rover Navigation API

## The Problem

Rovers are deployed on a rectangular plateau and controlled via a string of instructions:
- `L` / `R` — rotate 90° left or right
- `M` — move forward one grid point

Each rover completes its full path before the next one starts.

## Tech Stack

- **Node.js + Express** — REST API
- **Jest + Supertest** — unit and integration testing
- **Morgan** — request logging
- **dotenv** — environment config

## Project Structure
```
moon-rover/
├── src/
│   ├── rover.js        # core movement logic
│   ├── parser.js       # parses raw text input
│   └── validator.js    # input validation
├── tests/
│   ├── rover.test.js   # unit tests
│   └── api.test.js     # API integration tests
├── app.js              # express app
├── server.js           # server entry point
└── .env
```

## Setup
```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

## Run Tests
```bash
npm test
```

10 tests — all passing

## API

### `GET /`
Health check.

**Response:**
```json
{
  "status": "ok",
  "message": "Moon Rover API",
  "version": "1.0.0"
}
```

---

### `POST /api/rovers`
Send plateau size and rover instructions, get final positions back.

**Request:**
```json
{
  "input": "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM"
}
```

**Input format:**
```
5 5          ← plateau upper-right coordinates
1 2 N        ← rover starting position (x, y, direction)
LMLMLMLMM   ← movement instructions
3 3 E
MMRMMRMRRM
```

**Response:**
```json
{
  "success": true,
  "output": ["1 3 N", "5 1 E"]
}
```

**Error response:**
```json
{
  "success": false,
  "error": "Rover 1 has invalid command"
}
```

## Features

- Handles multiple rovers sequentially
- Boundary detection — rovers can't move outside the plateau
- Collision detection — rovers can't occupy the same cell
- Descriptive error messages for bad input
