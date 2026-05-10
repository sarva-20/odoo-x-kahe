process.chdir(__dirname);

const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const tripRoutes=require('./src/routes/tripRoutes');
const itineraryRoutes = require('./src/routes/itineraryRoutes');
const utilityRoutes=require('./src/routes/utilityRoutes');
dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5174', 'http://127.0.0.1:5174'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/trips',tripRoutes);
app.use('/api', itineraryRoutes);
app.use('/api', utilityRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});
