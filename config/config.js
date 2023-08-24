const prodConfig = require("./config.prod");

const defaultConfig = {
    // Database connection config
    httpPort: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || "localhost",
        name: process.env.DB_NAME || "test",
        user: process.env.DB_USER || "user",
        password: process.env.DB_PASS || "ABA$ST1BL3%_hSg_",
        dialect: "mysql"
    },
    
    JWTKey: "ABA$ST1BL3%_hSg_",
 
};

module.exports = {
    ...defaultConfig,
    ...prodConfig,
};