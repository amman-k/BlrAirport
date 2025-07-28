const axios = require('axios');

const getArrivals = async (req, res) => {
  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        arr_iata: 'BLR', 
        limit: 30,
      }
    });
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ message: 'Failed to fetch flight data' });
  }
};

module.exports = { getArrivals };