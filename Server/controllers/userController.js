const bcrypt = require('bcryptjs');
const User = require('../models/userschema');
const jwt = require('jsonwebtoken');
// User Registration
exports.register = async (req, res) => {
  try {
    const { user_id, email, password, role, mobile } = req.body;

    // Check if the email domain is allowed
    const allowedDomain = 'nitc.ac.in'; // Replace with your specific domain
    const emailDomain = email.split('@')[1];
    
    if (emailDomain !== allowedDomain) {
      return res.status(400).json({ message: `Only emails from ${allowedDomain} are allowed` });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);  // 10 is the number of salt rounds

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ user_id, email, password: hashedPassword, role, mobile });
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      // Create JWT token
      const token = jwt.sign({ userId: user.user_id, role: user.role }, 'your_jwt_secret', {
        expiresIn: '1h',
      });
  
      // Send response with token
      res.json({ token,userId:user.user_id,role:user.role });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.user = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Fetch user from database using user_id from the decoded token
    const user = await User.findOne({ user_id: decoded.userId }).select('user_id email role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user data
    res.json({  user_id: user.user_id, email: user.email, role: user.role });
  } catch (error) {
    console.error('Error in getUserInfo:', error);
    res.status(500).json({ message: error.message });
  }
};