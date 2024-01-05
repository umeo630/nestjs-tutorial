export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  server: {
    port: parseInt(process.env.PORT) || 3000,
    hostName: process.env.hostname || 'localhost:3000',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USERNAME || 'root',
    pass: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'nest-dev',
  },
  databaseTest: {
    host: process.env.DB_TEST_HOST || 'localhost',
    port: parseInt(process.env.DB_TEST_PORT) || 5431,
    user: process.env.DB_TEST_USERNAME || 'root',
    pass: process.env.DB_TEST_PASSWORD || 'password',
    name: process.env.DB_TEST_NAME || 'nest-test',
  },
});
