require('dotenv').config();

module.exports = {
    development: {
      url:process.env.DB_DEV_URL,
      dialect:'postgres'
    },
    test: {
      database:'nipadxqg',
      use_env_variables: 'DB_TEST_URL',
      dialect:'postgres'
    },
    producton: {
      database:'nipadxqg',
      use_env_variables: 'DB_PROD_URL',
      dialect:'postgres'
    }
}