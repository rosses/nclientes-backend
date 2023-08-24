const jwt = require("jsonwebtoken");
const { JWTKey } = require("../config/config");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return res.status(200).send({success:true});
    }
    const token = req.headers.authorization;
    
    jwt.verify(token, JWTKey, (err, decoded) => {
        // if token not verified throw 403
        if (err) {
            return res
                .status(401)
                .send({
                    error: ["Invalid token"]
                });
        }
        
        // set request with decoded token so next middlewares can use it
        req.user = decoded;
        
        next();
    });
};