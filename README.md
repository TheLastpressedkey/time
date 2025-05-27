# Time & Date API

A simple REST API that returns the current date and time of the user.

## Features

- REST API endpoint to fetch current date and time
- Proper API response formatting with JSON
- Error handling for API requests
- CORS support for cross-origin requests
- Simple frontend interface to display the time data

## API Endpoints

### GET `/api/time`

Returns the current time and date information.

**Response Example:**

```json
{
  "success": true,
  "data": {
    "date": "7/1/2025",
    "time": "3:30:45 PM",
    "iso": "2025-07-01T15:30:45.123Z",
    "timestamp": 1751234567890,
    "timezone": "America/New_York",
    "timezoneOffset": -240
  }
}
```

## Setup and Usage

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Start the API server:
   ```
   npm run start:server
   ```

4. Or run both simultaneously:
   ```
   npm run dev:full
   ```

5. Access the API at: `http://localhost:3001/api/time`
   
6. Access the frontend at: `http://localhost:5173`

## Technologies Used

- Express.js - Backend API
- React.js - Frontend UI
- TypeScript - Type safety
- Tailwind CSS - Styling