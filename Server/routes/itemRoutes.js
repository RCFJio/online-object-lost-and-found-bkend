const express = require('express');
const { postItem, findItems, getLostItemsByUser } = require('../controllers/itemController');
const authenticate = require('../middleware/userauth');
const upload = require("../middleware/upload");
const router = express.Router();

router.get('/find', findItems);
router.get('/lost-items', authenticate, getLostItemsByUser);
router.post("/post", authenticate, upload.single("image"), postItem);

module.exports = router;