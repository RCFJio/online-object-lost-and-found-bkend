const jwt = require('jsonwebtoken');
const authorizeAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req.userId = decoded.userId;
      req.userRole = decoded.role;
  
      // Check if the user is an admin
      if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }
  
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  
  module.exports = authorizeAdmin;