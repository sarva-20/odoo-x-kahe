const authService = require('../services/authService');
const config = require('../config/config');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }
    const token = await authService.registerUser(email, password, name);
    res.cookie('token', token, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
      stack: config.env === 'production' ? undefined : error.stack,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }
    const token = await authService.loginUser(email, password);
    res.cookie('token', token, {
      httpOnly: true,                
      secure: config.env === 'production', 
      sameSite: 'strict',            
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      success: false,
      message: error.message,
      stack: config.env === 'production' ? undefined : error.stack,
    });
  }
};
