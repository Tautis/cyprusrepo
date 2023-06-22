
import axios from 'axios';
import cron from 'node-cron';
// const mysql = require('mysql');
import {db} from '../db.js'

const endpoint = 'https://openexchangerates.org/api/latest.json';
const accessKey = '75096f7590214607aaf92338ee9e2992';
async function updateExchangeRates() {
    const currencies = ['GBP', 'EUR', 'RUB'];
    try {
      // Fetch the latest exchange rates from the API
      const response = await axios.get(endpoint, {
        params: {
          app_id: accessKey,
          symbols: currencies.join(','),
        },
      });
  
      const rates = response.data.rates;
  
      // Update the SQL table with the new exchange rates
      //GBP TO
      console.log(rates.USD)
      const updateQuery = `UPDATE rates SET
        USD = ${1/rates.GBP},
        EUR = ${(1/rates.GBP)/(1/rates.EUR)},
        RUB = ${(1/rates.GBP)/(1/rates.RUB)}
      `;
  
      db.query(updateQuery, (error, results) => {
        if (error) throw error;
        console.log('Exchange rates updated successfully');
      });
    } catch (error) {
      console.error('Error updating exchange rates:', error);
    } finally {
        db.end(); // Close the MySQL connection
    }
  }
  
  // Call the function to update the exchange rates
  export default updateExchangeRates;