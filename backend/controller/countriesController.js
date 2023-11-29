const { query, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const axios = require('axios');
require('dotenv').config()

exports.getCountryInfo = [
  query("name", "Country Name must be specified!").trim().isLength({ min: 1 }),
  query('name').custom((value) => {
    if (/\d/.test(value)) {
      throw new Error('Country Name must not contain numbers!');
    }

    return true;
  }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Error fetching data from the API:', errors.array()[0].msg);
      res.status(400).json({ error: errors.array()[0].msg });

    } else {
      const country = req.query.name.trim();
      try {
        const response = await axios.get(process.env.COUNTRIES_API_URL + country);
        const countries = response.data;
          res.json(countries);
        
      } catch (error) {
          if (error.response && error.response.status === 404) {
            res.status(404);
            res.json({ error: 'Country not found' });
          } else {
            console.error('Error fetching data from the API:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }



      

      
    }
  }),


];


      