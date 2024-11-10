const bcrypt = require('bcryptjs');
const User = require('../models/userschema');

// User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, mobile } = req.body;

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
    const newUser = new User({ name, email, password: hashedPassword, role, mobile });
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
      const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', {
        expiresIn: '1h',
      });
  
      // Send response with token
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };