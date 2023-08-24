const express = require("express");
require('dotenv').config({path: __dirname + '/.env', override: true })
const bodyParser = require("body-parser");
const { httpPort } = require("./config/config");
const path = require("path");
const app = express();


// let's have documentation at the root
app.use(express.static("doc"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});


app.get("/docs", function(req, res) {
    res.sendFile(path.join(__dirname + "/doc/index.html"));
});


/* Uncomment below lines if JWT authentication is to be used */
// it will be good to move below two imports to top of the file
const AuthRouter = require("./routes/auth.route");
/*
const CommonRouter = require("./routes/common.route");
const PublicRouter = require("./routes/public.route");
const CylinderRoute = require("./routes/cylinder.route");
const OrderRoute = require("./routes/order.route");
const DefectRoute = require("./routes/defect.route");
const FactoryRoute = require("./routes/factory.route");
const InspectionRoute = require("./routes/inspection.route");
const UserRouter = require("./routes/user.route");
const RPARoute = require("./routes/rpa.route");
*/


const jwtMiddleware = require("./middlewares/jwt.middleware");

app.use("/v1/auth", AuthRouter);
//app.use("/v1/common", CommonRouter);
//app.use("/v1/public", PublicRouter);
//app.use("/v1/defect", DefectRoute);
//app.use("/v1/factory", FactoryRoute);
//app.use("/v1/rpa", RPARoute);

app.use(jwtMiddleware); // Protected endpoints
//app.use("/v1/user", UserRouter);
//app.use("/v1/cylinder", CylinderRoute);
//app.use("/v1/order", OrderRoute);
//app.use("/v1/inspection", InspectionRoute);

// custom error handlers
// this will also catch async errors since we are usign express-async-errors
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send({
        error: ["Unexpected error occurred"]
    });
});

app.listen(httpPort, () => console.log(`NCLIENTES API app listening on port ${httpPort}!`));