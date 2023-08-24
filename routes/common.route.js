const express = require("express");
const router = express.Router();
const UserValidationRules = require("../validation-rules/user.rule");
const validateMiddleware = require("../middlewares/validate.middleware");
const UserController = require("../controllers/user.controller");
const {
  sequelize,
  ReasonModel,
  FactoryModel,
  InspectorModel,
  DamageModel,
  DefectModel,
  ReInspectorModel,
} = require("../db");
require("express-async-errors");

router.get("/", async (req, res, next) => {
  res.send({
    success: true,
    mysql: await sequelize.query("SELECT VERSION()", {
      raw: true,
      type: sequelize.QueryTypes.SELECT,
    }),
  });
});

router.get("/masterdata", async (req, res, next) => {
  if (
    req.query.filter == "Reasons" ||
    req.query.filter == "Defects" ||
    req.query.filter == "Damages" ||
    req.query.filter == "Inspectors" ||
    req.query.filter == "Factories" ||
    req.query.filter == "ReInspectors"
  ) {
    res.send({
      success: true,
      data: await sequelize.query(
        "SELECT * FROM " + req.query.filter + " ORDER BY orden ASC",
        { raw: true, type: sequelize.QueryTypes.SELECT }
      ),
    });
  }
});

router.post("/masterdata", async (req, res, next) => {
  let d = {};
  console.log(req.body.data);
  if (req.body.type == "Reasons") {
    if (req.body.data.id == 0) {
      d = await ReasonModel.create({
        name: req.body.data.name,
        orden: req.body.data.orden,
      });
    } else {
      d = await ReasonModel.findOne({ where: { reasonId: req.body.data.id } });
    }
  } else if (req.body.type == "Defects") {
    if (req.body.data.id == 0) {
      d = await DefectModel.create({
        name: req.body.data.name,
        orden: req.body.data.orden,
        reasonId: req.body.data.motivoId,
        reasonText: req.body.data.motivo,
      });
    } else {
      d = await DefectModel.findOne({ where: { defectId: req.body.data.id } });
    }
  } else if (req.body.type == "Damages") {
    if (req.body.data.id == 0) {
      d = await DamageModel.create({
        name: req.body.data.name,
        orden: req.body.data.orden,
      });
    } else {
      d = await DamageModel.findOne({ where: { damageId: req.body.data.id } });
    }
  } else if (req.body.type == "Inspectors") {
    if (req.body.data.id == 0) {
      d = await InspectorModel.create({
        name: req.body.data.name,
        orden: req.body.data.orden,
        imgName: req.body.data.imgName,
      });
    } else {
      d = await InspectorModel.findOne({
        where: { inspectorId: req.body.data.id },
      });
    }
  } else if (req.body.type == "Factories") {
    if (req.body.data.id == 0) {
      d = await FactoryModel.create({
        name: req.body.data.name,
        orden: req.body.data.orden,
      });
    } else {
      d = await FactoryModel.findOne({
        where: { factoryId: req.body.data.id },
      });
    }
  } else if (req.body.type == "ReInspectors") {
    if (req.body.data.id == 0) {
      d = await ReInspectorModel.create({
        name: req.body.data.name,
        orden: req.body.data.orden,
        imgName: req.body.data.imgName,
      });
    } else {
      d = await ReInspectorModel.findOne({
        where: { reInspectorId: req.body.data.id },
      });
    }
  }

  if (d.name) {
    d.name = req.body.data.name;
    d.orden = req.body.data.orden;
    if (d.imgName) {
      d.imgName = req.body.data.imgName;
    }
    if (d.reasonText) {
      d.reasonId = req.body.data.motivoId;
      d.reasonText = req.body.data.motivo;
    }

    d.save();
    res.send({
      success: true,
    });
  } else {
    res.status(400).send({
      success: false,
      message: "Model unknown",
    });
  }
});

router.post("/masterdata-remove", async (req, res, next) => {
  let d = {};
  if (req.body.type == "Reasons") {
    await ReasonModel.destroy({ where: { reasonId: req.body.id } });
  } else if (req.body.type == "Defects") {
    await DefectModel.destroy({ where: { defectId: req.body.id } });
  } else if (req.body.type == "Damages") {
    await DamageModel.destroy({ where: { damageId: req.body.id } });
  } else if (req.body.type == "Inspectors") {
    await InspectorModel.destroy({ where: { inspectorId: req.body.id } });
  } else if (req.body.type == "Factories") {
    await FactoryModel.destroy({ where: { factoryId: req.body.id } });
  } else if (req.body.type == "ReInspectors") {
    await ReInspectorModel.destroy({ where: { reInspectorId: req.body.id } });
  }
  res.send({
    success: true,
  });
});

module.exports = router;
