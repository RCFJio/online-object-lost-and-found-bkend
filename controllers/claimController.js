const Item = require('../models/itemschema');
const Claim = require('../models/claimschema');

exports.claimItem = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.isClaimed) {
      return res.status(400).json({ message: 'Item already claimed' });
    }

    const newClaim = new Claim({
      itemId: itemId,
      claimedBy: req.userId,
    });
    await newClaim.save();

    item.isClaimed = true;
    await item.save();

    res.status(201).json({ message: 'Item claimed successfully. Awaiting admin approval.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};