const Item = require('../models/itemschema');
const User = require('../models/userschema'); 
const nodemailer = require('nodemailer');
// Function to send email notification
const sendEmailNotification = (userEmail, itemTitle) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use another email service if needed
    auth: {
      user: 'jijo23867@gmail.com', // Replace with your email address
      pass: 'telmasbrxeifbmhv',   // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: 'jijo23867@gmail.com',
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
        const user = await User.findOne({ user_id: item.postedBy });
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

exports.findItems = async (req, res) => {
  try {
    const { status = 'found', category, location, date, object_id } = req.query; // Default status to 'found'

    const filter = { status }; // Always filter by 'found' items
    if (category) filter.category = category;
    if (location) filter.location = location;

    // Add object_id filter if provided
    if (object_id) {
      try {
        filter._id = object_id; // Ensure it's a valid ID format
      } catch (err) {
        return res.status(400).json({ message: 'Invalid object_id format' });
      }
    }

    // Apply date filter only if category is present
    if (category && date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1); // Get the next day to include the full day

      filter.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const items = await Item.find(filter);

    // Check if no items were found
    if (items.length === 0) {
      return res.status(404).json({ message: 'No matching items found' });
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLostItemsByUser = async (req, res) => {
  try {
    // Assuming `req.userId` contains the authenticated user's `user_id`
    const lostItems = await Item.find({ 
      postedBy: req.userId, 
      status: 'lost' // Filter only 'lost' items
    });

    if (lostItems.length === 0) {
      return res.status(404).json({ message: 'No lost items found for this user.' });
    }

    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
