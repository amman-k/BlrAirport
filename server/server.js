require('dotenv').config();
const express = require('express');
const cors = require('cors');
const flightRoutes = require('./routes/flightRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/flights', flightRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is listening on port ${PORT}`);
});