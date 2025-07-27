const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "BLR Airport Server is Live!" });
});

app.listen(PORT, () => {
  console.log(`Backend server is listening on port ${PORT}`);
});