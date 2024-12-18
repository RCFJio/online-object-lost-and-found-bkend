const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const adminRoutes = require('./routes/adminRoutes');
const claimRoutes = require('./routes/claimRoutes');
const path = require("path");
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Specify the allowed origin
}));

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/project', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

  app.use('/api/auth', authRoutes);
  app.use('/api/items', itemRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/claim', claimRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
