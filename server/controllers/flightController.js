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

const getDepartures= async (req,res)=>{
    try{
        const response = await axios.get('https://api.aviationstack.com/v1/flights',{
            params:{
                access_key: process.env.AVIATIONSTACK_API_KEY,
        dep_iata: 'BLR',
        limit: 30
            }
        });
        res.json(response.data.data);
    }catch(err){
        console.error("Error fetching departure Data",err.message);
        res.status(500).json({ message: 'Failed to fetch departure data' });
    }
}

module.exports = { getArrivals,getDepartures };