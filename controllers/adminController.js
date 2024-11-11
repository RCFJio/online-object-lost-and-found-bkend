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

exports.approveClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId).populate('itemId');
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    claim.status = 'approved';
    await claim.save();

    const item = await Item.findById(claim.itemId);
    item.status = 'found';
    await item.save();

    res.status(200).json({ message: 'Claim approved and item marked as found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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