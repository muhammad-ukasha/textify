const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Routes = require('./router/index');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const api = process.env.API
// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`DB Connection Error: ${err}`));

// Example Route
app.use(Routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
