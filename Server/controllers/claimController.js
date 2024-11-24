const Item = require('../models/itemschema');
const Claim = require('../models/claimschema');

exports.claimItem = async (req, res) => {
  const { lost_id, found_id } = req.body; // Assume both lost and found item IDs are sent in the request body

  try {
    // Find both the lost and found items
    const lostItem = await Item.findById(lost_id);
    const foundItem = await Item.findById(found_id);

    if (!lostItem || !foundItem) {
      return res.status(404).json({ message: 'One or both items not found' });
    }

    // Check if either item has already been claimed
    const existingClaim = await Claim.findOne({ lost_id, found_id, status: 'pending' });
    if (existingClaim) {
      return res.status(400).json({ message: 'Claim already exists and is pending approval' });
    }

    // Create a new claim with both lost_id and found_id
    const newClaim = new Claim({
      lost_id: lost_id,
      found_id: found_id,
      claimedBy: req.userId, // User ID from authenticated user, assuming req.userId is populated
    });
    await newClaim.save();

    res.status(201).json({ message: 'Item claimed successfully. Awaiting admin approval.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClaimsByUser = async (req, res) => {
  try {
    const { status } = req.query; // Optional filter for status (pending, approved, rejected)
    const userId = req.userId; // Extract the logged-in user's ID from the middleware

    // Build query filter
    const filter = { claimedBy: userId }; // Match claims made by the logged-in user
    if (status) filter.status = status; // Add status filter if provided in the query

    // Fetch claims from the database
    const claims = await Claim.find(filter)
      .populate("lost_id") // Populate the lost item details
      .populate("found_id"); // Populate the found item details

    // Check if claims exist
    if (claims.length === 0) {
      return res.status(404).json({ message: "No claims found for the logged-in user." });
    }

    res.status(200).json(claims);
  } catch (error) {
    console.error("Error fetching claims by user:", error);
    res.status(500).json({ message: "An error occurred while fetching claims." });
  }
};
