const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const tripRoutes=require('./src/routes/tripRoutes');
const itineraryRoutes = require('./src/routes/itineraryRoutes');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/trips',tripRoutes);
app.use('/api', itineraryRoutes);
const PORT = process.env.PORT || 5000;
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
