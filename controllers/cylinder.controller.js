const {
  User,
  Profile,
  CylinderModel,
  UserModel,
  CylinderReasonModel,
  sequelize,
  InspectionModel,
  OrderDetailsModel,
  OrderModel,
  InspectionsDamageModel,
  InspectionsDefectModel,
} = require("../db");
const cylinder = require("../models/cylinder");
const inspectionsDamage = require("../models/inspectionsDamage");
const inspector = require("../models/inspector");
const order = require("../models/order");
const orderdetail = require("../models/orderdetail");
const { Op, where } = require("sequelize");

async function create(req, res) {
  try {
    const cylinder = await CylinderModel.create({
      code: req.body.code,
      material: req.body.material,
      anotherObservation: req.body.anotherObservation,
      haveSeal: req.body.haveSeal,
      firstWeight: req.body.firstWeight,
      createdBy: req.user.userId,
      status: 1,
    });
    cylinder.save();
    if (req.body.reasons) {
      for (let i = 0; i < req.body.reasons.length; i++) {
        const r = await CylinderReasonModel.create({
          cylinderId: cylinder.cylinderId,
          reasonId: req.body.reasons[i].reasonId,
          reasonText: req.body.reasons[i].name,
        });
        r.save();
      }
    }
    res.send({ success: true, data: cylinder });
  } catch (err) {
    console.log(err);
    res.send({ success: false, err: err });
  }
}

async function list(req, res) {
  try {
    console.log("cylinder.list:req.user.userId: ", req.user.userId);
    let cylinders = [];
    if (
      req.user.profileId == 1 ||
      req.user.profileId == 3 ||
      req.user.profileId == 4
    ) {
      cylinders = await CylinderModel.findAll({
        where: { createdBy: req.user.userId },
      });
    } else if (req.user.profileId == 2) {
      cylinders = await CylinderModel.findAll({
        where: {},
      });
    } else if (req.user.profileId == 5) {
      cylinders = await CylinderModel.findAll({
        where: {},
      });
    }
    res.send({ success: true, data: cylinders });
  } catch (err) {
    console.log(err);
    res.send({ success: false, err: err });
  }
}
async function remove(req, res) {
  try {
    const cylinder = await CylinderModel.findOne({
      where: {
        cylinderId: req.body.cylinderId,
      },
    });
    await cylinder.destroy({ where: { cylinderId: req.body.cylinderId } });

    res.send({ success: true, data: cylinder });
  } catch (err) {
    console.log(err);
    res.send({ success: false, err: err });
  }
}

async function filter(req, res) {
  const { status, material } = req.query;
  const cylinder = await CylinderModel.findAll({
    where: {
      ...(status ? { status } : {}),
      ...(material ? { material } : {}),
      createdBy: req.user.userId,
    },
  });

  res.send({ success: true, data: cylinder });
}

async function reports(req, res) {
  let { from, to, distributor, region } = req.query;

  let whereClause = {};
  let userWhereClause = {};

  if (from && to) {
    to = new Date(to + "T00:00:00.000Z");
    to.setDate(to.getDate() + 1);
    whereClause.createdAt = {
      [Op.and]: [{ [Op.gte]: from }, { [Op.between]: [from, to] }],
    };
  }
  if (distributor) {
    userWhereClause = distributor
      ? {
          [Op.or]: [
            { name: { [Op.substring]: distributor } },
            { sapCode: { [Op.substring]: distributor } },
          ],
        }
      : {};
  }

  const cylinders = await CylinderModel.findAll({
    where: whereClause,
    include: [
      { model: UserModel, as: "CreatedByUser", where: userWhereClause },
      { model: CylinderReasonModel, as: "CylinderReasons" },
      {
        model: InspectionModel,
        as: "Inspection",
        include: [{ model: InspectionsDamageModel, as: "Damages" }, {model: InspectionsDefectModel, as: "Defects"}],
      },
      {
        model: OrderDetailsModel,
        as: "OrderDetails",
        include: [{ model: OrderModel, as: "Order" }],
      },
    ],
  });
  if (cylinders) {
    res.send({ sucess: true, data: cylinders });
  } else {
    res.send({ sucess: false });
  }
}

module.exports = {
  create,
  list,
  remove,
  filter,
  reports,
};
