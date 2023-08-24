const jwt = require("jsonwebtoken");
const { JWTKey } = require("../config/config");
const { ClienteModel } = require("../db");
const sgMail = require("@sendgrid/mail");
const axios = require("axios");
const crypto = require('crypto')

/**
 * @api {post} /v1/auth/login Generate JWT token
 * @apiGroup Auth
 * @apiName Login
 *
 * @apiContentType application/json
 *
 * @apiParam {String} username USername of app
 * @apiParam {String} password Password of user
 */

login = async (req, res) => {
  const query = { email_cliente: req.body.email };
  let cliente = await ClienteModel.findOne({ where: query });
  console.log(cliente);
  if (cliente) {
    let md5 = crypto.createHash('md5').update(req.body.password).digest("hex");
    if (cliente.password_cliente == md5) {
      res.send({
        success: true,
        token: jwt.sign(cliente.get({ plain: true }), JWTKey),
        profile: cliente,
      });
    }
  }
  res.status(400).send({
    error: ["Acceso denegado."],
  });
};
validate = async (req, res) => {
  let decode = jwt.verify(req.body.token, JWTKey);
  if (decode) {
    res.send({
      success: true,
      data: decode,
    });
  } else {
    res.status(400).send({
      success: false,
    });
  }
};

password = async (req, res) => {
  const correo = sgMail.setApiKey(process.env.SENGRID_API_KEY);
  const { username, location } = req.body;
  // const locationQA = "https://devoluciondecilindros-qa.abastible.cl/password";

  let user = await UserModel.findOne({ where: { username: username } });
  // Generar Token
  if (user) {
    const token =
      "a" + Date.now().toString(32) + Math.random().toString(32).substring(2);
    user.passToken = token;
    await user.save();

    //Enviar Email
    const msg = {
      to: `${user.email}`,
      from: "Devoluciondecilindros@abastible.cl",
      subject: "Cambio de contraseña | Cilindro Defectuosos",
      html: ` <h1> ${user.name}, Haz solicitado el cambio de contraseña.</h1>
    <h2>Ingresa al siguiente enlace para restablecer tu contraseña. <a href="${location}-change/${token}">Cambio de Contraseña.</a></h2>
    `,
    };
    correo.send(msg);

    res.send({
      success: true,
    });
  } else {
    res.status(400).send({ sucess: false });
  }
};

passwordChange = async (req, res) => {
  const { token, pass } = req.body;
  const user = await UserModel.findOne({ where: { passToken: token } });
  if (user) {
    user.passToken = "";
    user.password = pass;
    await user.save();
    res.send({
      sucess: true,
    });
  } else {
    res.status(400).send({ sucess: false, error: ["Cambio no Valido"] });
  }
};

module.exports = {
  login,
  validate,
  password,
  passwordChange,
};
