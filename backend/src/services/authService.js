const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const prisma = require('../config/prisma');

class AuthService {
  async registerUser(email, password, name) {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Invalid input: email and password must be strings.');
    }
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    if (!normalizedEmail || !normalizedPassword) {
      throw new Error('Email and password are required.');
    }
    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(normalizedPassword, config.security.saltRounds);
    
    const user = await prisma.user.create({
      data: { email: normalizedEmail, password: hashedPassword, name }
    });

    return this.generateToken(user.id);
  }

  async loginUser(email, password) {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Invalid input: email and password must be strings.');
    }
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    if (!normalizedEmail || !normalizedPassword) {
      throw new Error('Email and password are required.');
    }

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(normalizedPassword, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return this.generateToken(user.id);
  }

  generateToken(userId) {
    return jwt.sign(
      { userId }, 
      config.jwt.secret, 
      { expiresIn: config.jwt.expiresIn }
    );
  }
}

module.exports = new AuthService();
