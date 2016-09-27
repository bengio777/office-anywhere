require('dotenv').config();
// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection:'postgres://localhost/office-anywhere'

  },


  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL+ '?ssl=true',
    },

  };
