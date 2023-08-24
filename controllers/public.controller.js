const { Sequelize } = require("sequelize");
const {
  DefectModel,
  CylinderModel,
  UserModel,
  CylinderReasonModel,
  ReasonModel,
  sequelize,
  FactoryModel,
  OrderModel,
  OrderDetailsModel,
  DamageModel,
  InspectorModel,
  ReInspectorModel,
  InspectionModel,
  InspectionsDamageModel,
  InspectionsDefectModel,
} = require("../db");

const { Op, where } = require("sequelize");
const { type } = require("joi/lib/types/object");
const { request } = require("express");

async function getBySapCode(req, res) {
  const user = await UserModel.findOne({
    where: {
      sapCode: req.query.sapCode,
    },
  });
  if (user) {
    const data = await sequelize.query(
      `
            SELECT 
                c.*,  
                (
                 SELECT GROUP_CONCAT(cr.reasonText SEPARATOR ', ') 
                 FROM CylinderReasons cr WHERE cr.cylinderId = c.cylinderId
                ) Reasons
            FROM Cylinders c WHERE c.createdBy = ` +
        user.userId +
        `
            ` +
        (req.query.status ? " AND c.status = " + req.query.status : "") +
        `
            `,
      { raw: true, type: Sequelize.QueryTypes.SELECT }
    );
    res.send(data);
  } else {
    res.send([]);
  }
}
async function getReasons(req, res) {
  res.send(await ReasonModel.findAll());
}
async function getDefects(req, res) {
  res.send(await DefectModel.findAll());
}
async function getFactorys(req, res) {
  res.send(await FactoryModel.findAll());
}
async function getInspectors(req, res) {
  res.send(await InspectorModel.findAll());
}
async function getDamages(req, res) {
  res.send(await DamageModel.findAll());
}
async function getReInspectors(req, res) {
  res.send(await ReInspectorModel.findAll());
}
async function getCode(req, res) {
  console.log("getCode::" + req.query.code);
  let precint = await CylinderModel.findOne({
    where: {
      code: req.query.code,
    },
    include: [{ model: UserModel, as: "CreatedByUser" }],
  });
  if (precint) {
    precint = JSON.parse(JSON.stringify(precint));
    precint.reasons = await CylinderReasonModel.findAll({
      where: {
        cylinderId: precint.cylinderId,
      },
    });
    res.send({
      success: false,
      data: precint,
    });
  } else {
    res.status(400).send({
      success: false,
      data: {},
    });
  }
}
async function addOrder(req, res) {
  let user = await UserModel.findOne({
    where: {
      sapCode: req.body.sapCode,
    },
  });
  if (user) {
    const order = await OrderModel.create({
      saleOrder: req.body.saleOrder,
      deliveryOrder: "",
      status: 1,
      source: 0,
      createdBy: user.userId,
    });
    order.save();

    for (let i = 0; i < req.body.materials.length; i++) {
      let cylinder = await CylinderModel.findOne({
        where: { code: req.body.materials[i].code },
      });
      cylinder.status = 0;
      cylinder.save();

      let od = await OrderDetailsModel.create({
        orderId: order.orderId,
        cylinderId: cylinder.cylinderId,
      });
      od.save();
    }

    res.send({
      success: true,
      orderId: order.orderId,
    });
  } else {
    res.status(400).send({
      success: false,
      orderId: 0,
    });
  }
}
async function getDashboardStats(req, res) {
  if (req.query.filter == "zones") {
    res.status(200).send({
      success: true,
      data: {
        labels: ["Sin zona"],
        datasets: [
          { data: [11], label: "Guías generadas" },
          { data: [3], label: "cilindros registrados" },
          { data: [3], label: "cilindros diagnosticados" },
        ],
      },
    });
  } else if (req.query.filter == "periodChoose") {
    const { year, month } = req.query;

    const date = new Date(year, month - 1);
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let mesActual = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
      date
    );
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const orders = await OrderModel.count({
      where: { createdAt: { [Op.between]: [startOfMonth, endOfMonth] } },
    });

    const cylindersTotal = await CylinderModel.count({
      where: { createdAt: { [Op.between]: [startOfMonth, endOfMonth] } },
    });

    const inspections = await InspectionModel.count({
      distinct: true,
      col: "cylinderId",
      where: { createdAt: { [Op.between]: [startOfMonth, endOfMonth] } },
    });

    res.status(200).send({
      success: true,
      data: {
        labels: [`${capitalize(mesActual)}, ${year}`],
        datasets: [
          { data: [orders], label: "Guías generadas" },
          { data: [cylindersTotal], label: "cilindros registrados" },
          { data: [inspections], label: "cilindros diagnosticados" },
        ],
      },
    });
  }
}
async function getOrdersBySapCode(req, res) {
  const user = await UserModel.findOne({
    where: {
      sapCode: req.query.sapCode,
    },
  });
  if (user) {
    /*
    ,  
                (
                 SELECT GROUP_CONCAT(c.code SEPARATOR ', ') 
                 FROM OrderDetails od INNER JOIN Cylinders c ON c.cylinderId = od.cylinderId 
                 WHERE od.orderId = o.orderId 
                ) Cylinders
    */
    const data = await sequelize.query(`SELECT o.* FROM Orders o INNER JOIN Users u ON u.userId = o.createdBy WHERE u.userId = ` + user.userId + `` + (req.query.status ? " AND o.status = " + req.query.status : "") + ` `,
      { raw: true, type: Sequelize.QueryTypes.SELECT }
    );
    res.send(data);
  } else {
    res.send([]);
  }
}
async function getOrder(req, res) {
  const order = await OrderModel.findOne({
    where: {
      [Op.or]: [{ saleOrder: req.query.order }, { orderId: req.query.order }],
    },
    include: [
      {
        model: OrderDetailsModel,
        as: "OrderDetails",
        include: [
          { 
            model: CylinderModel, 
            as: "Cylinder",
            include: [
              { 
                model: InspectionModel, 
                as: "Inspection",
                include: [
                  { 
                    model: InspectionsDamageModel, 
                    as: "Damages" 
                  },
                  { 
                    model: InspectionsDefectModel, 
                    as: "Defects" 
                  }
                ]
              },
            ]
          }
        ],
      },
      { model: UserModel, as: "createdByUser" },
    ],
  });
  if (order) {
    res.send({
      data: order,
    });
  } else {
    res.status(400).send({
      success: false,
      data: {},
    });
  }
}

module.exports = {
  getBySapCode,
  getOrdersBySapCode,
  getReasons,
  getCode,
  getDefects,
  getFactorys,
  getInspectors,
  getDamages,
  getReInspectors,
  addOrder,
  getDashboardStats,
  getOrder
};
