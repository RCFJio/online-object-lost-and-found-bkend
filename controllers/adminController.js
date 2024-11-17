const Item = require('../models/itemschema');
const Claim = require('../models/claimschema');

exports.viewAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const nodemailer = require('nodemailer');
// Email notification function
const sendEmailNotification = (userEmail, itemTitle) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use any other email service if preferred
    auth: {
      user: 'jijo23867@gmail.com', // Replace with your email address
      pass: 'telmasbrxeifbmhv',   // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: 'jijo23867@gmail.com',
    to: userEmail,
    subject: 'Item Claim Approved: Collect Your Item',
    text: `Your claim for the item titled "${itemTitle}" has been approved. Please collect it at your earliest convenience.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
exports.approveClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId).populate('lost_id found_id');
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    // Approve the claim
    claim.status = 'approved';
    await claim.save();

    // Delete both the lost and found items from the database
    await Item.findByIdAndDelete(claim.lost_id);
    await Item.findByIdAndDelete(claim.found_id);

    // Send a notification to the user who claimed the item
    sendEmailNotification(claim.claimedBy, claim.lost_id.title);

    res.status(200).json({ message: 'Claim approved and both items removed from database' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Approve claim and notify user
/*exports.approveClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId).populate('itemId');
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    claim.status = 'approved';
    await claim.save();

    const item = await Item.findById(claim.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Fetch user details for notification
    const user = await User.findById(claim.claimedBy); // assuming claimedBy stores the user's ID

    // Send email notification to user
    if (user && user.email) {
      sendEmailNotification(user.email, item.title);
    }

    // Delete item from the collection after approval
    await Item.findByIdAndDelete(item._id);

    res.status(200).json({ message: 'Claim approved. Item deleted and notification sent to user.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/

exports.rejectClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    claim.status = 'rejected';
    await claim.save();

    const item = await Item.findById(claim.itemId);
    item.isClaimed = false;
    await item.save();

    res.status(200).json({ message: 'Claim rejected and item status reset' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};