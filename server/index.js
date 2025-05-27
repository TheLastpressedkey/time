import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/time', (req, res) => {
  try {
    const now = new Date();
    
    const timeData = {
      success: true,
      data: {
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        iso: now.toISOString(),
        timestamp: now.getTime(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: now.getTimezoneOffset()
      }
    };
    
    res.json(timeData);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get current time',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});