const dotenv = require('dotenv');
const path = require('path');


dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  
  database: {
    url: process.env.DATABASE_URL,
  },
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  
  security: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
  },
};

// Simple validation to ensure critical secrets are present
if (!config.jwt.secret) {
  throw new Error("FATAL ERROR: JWT_SECRET is not defined.");
}

module.exports = config;