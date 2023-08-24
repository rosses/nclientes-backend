/**
 * This is for production use
 * Whatever values you provide here will override the default in ./config.js
 * So for examply mongoDbUrl for production database will go here
 */

module.exports = {
  httpPort: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    name: process.env.DB_NAME || "test",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASS || "ABA$ST1BL3%_hSg_",
    dialect: "mysql",
  },
};
