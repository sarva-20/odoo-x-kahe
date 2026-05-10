const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Authentication required. No session found." 
    });
  }

  try {
    
    const decoded = jwt.verify(token, config.jwt.secret);
    
   
    req.userId = decoded.userId;
    
    next(); 
  } catch (err) {
    
    res.clearCookie('token');
    res.status(401).json({ 
      success: false, 
      message: "Session expired or invalid." 
    });
  }
};
