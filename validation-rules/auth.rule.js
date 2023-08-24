var Joi = require("joi");

module.exports = {
    login: {
        body : Joi.object().keys({
            username: Joi.string().required().label("Username"),
            password: Joi.string().required().label("Password"),
        })
    }
};