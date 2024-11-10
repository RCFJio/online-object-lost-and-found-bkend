const Item = require('../models/Item');
const User = require('../models/User'); // Assuming you have a User model
const nodemailer = require('nodemailer');

// Function to send email notification
const sendEmailNotification = (userEmail, itemTitle) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use another email service if needed
    auth: {
      user: 'your-email@gmail.com', // Replace with your email address
      pass: 'your-email-password',   // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: userEmail,
    subject: 'Potential Match for Your Lost Item',
    text: `We have found an item titled "${itemTitle}" that might match your lost item. Please check it out.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Post an item (Lost/Found)
exports.postItem = async (req, res) => {
  try {
    const { title, description, location, category, status } = req.body;

    // Create a new item
    const newItem = new Item({
      title,
      description,
      location,
      category,
      status,
      postedBy: req.userId,
    });

    // Save the new item to the database
    await newItem.save();

    // If the item is "found", look for similar "lost" items
    if (status === 'found') {
      // Find all lost items in the same category and location
      const similarItems = await Item.find({
        status: 'lost',
        category,
        location,
        _id: { $ne: newItem._id }, // Exclude the newly added item
      });

      // Notify users who posted the similar lost items
      for (let item of similarItems) {
        const user = await User.findById(item.postedBy);
        if (user && user.email) {
          sendEmailNotification(user.email, newItem.title);
        }
      }
    }

    res.status(201).json({ message: 'Item posted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find items
exports.findItems = async (req, res) => {
  try {
    const { status, category, location } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (location) filter.location = location;

    const items = await Item.find(filter);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};