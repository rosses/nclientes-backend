const {
  sequelize,
  OrderModel,
  OrderDetailsModel,
  UserModel,
  CylinderModel,
} = require("../db");
const { Op } = require("sequelize");
const cylinder = require("../models/cylinder");

async function create(req, res) {
  /*
    const cylinder = await CylinderModel.create({
        code: req.body.code,
        material: req.body.material,
        anotherObservation: req.body.anotherObservation,
        haveSeal: req.body.haveSeal,
        firstWeight: req.body.firstWeight,
        createdBy: 1,
        status: 1
    });

    res.send({
        data: {
            cylinderId: cylinder.cylinderId
        }
    });
    */
  res.send({ success: true });
}
async function list(req, res) {
  try {
    console.log("cylinder.list:req.user.userId: ", req.user.userId);
    let orders = [];
    if (
      req.user.profileId == 1 ||
      req.user.profileId == 3 ||
      req.user.profileId == 4
    ) {
      orders = await OrderModel.findAll({
        where: { createdBy: req.user.userId },
      });
    } else if (req.user.profileId == 2) {
      orders = await OrderModel.findAll({ where: {} });
    } else if (req.user.profileId == 5) {
      orders = await OrderModel.findAll({ where: {} });
    }

    res.send({ success: true, data: orders });
  } catch (err) {
    res.send({ success: false, err: err });
  }
}

async function get(req, res) {
  try {
    const orders = await OrderModel.findOne({
      where: { orderId: req.params.orderId },
    });
    // const details = await OrderDetailsModel.findAll({
    //     where: {orderId: req.params.orderId},
    // });

    const details = await sequelize.query(
      "" +
        "SELECT * " +
        "FROM OrderDetails OD " +
        "INNER JOIN Cylinders C ON C.cylinderId = OD.cylinderId " +
        "WHERE OD.orderId = :orderId",
      {
        raw: true,
        replacements: { orderId: req.params.orderId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    let order = JSON.parse(JSON.stringify(orders));
    order.details = JSON.parse(JSON.stringify(details));

    res.send({ success: true, data: order });
  } catch (err) {
    console.log(err);
    res.send({ success: false, err: err });
  }
}

// async function filter(req, res) {
//   const { status, date } = req.query;
//   const order = await OrderModel.findAll({
//     where: {
//       ...(status ? { status } : {}),
//       ...(date ? { createdAt: { [Op.substring]: date } } : {}),
//       createdBy: req.user.userId,
//     },
//   });

async function filter(req, res) {
  let { status, from, to } = req.query;

  let whereClause = {
    createdBy: req.user.userId,
  };

  if (status) {
    whereClause.status = status;
  }

  if (from && to) {
    to = new Date(to + "T00:00:00.000Z");
    to.setDate(to.getDate() + 1);
    whereClause.createdAt = {
      [Op.and]: [{ [Op.gte]: from }, { [Op.between]: [from, to] }],
    };
  }

  const order = await OrderModel.findAll({
    where: whereClause,
  });

  res.send({ success: true, data: order });
}

async function saveOrder(req, res) {
  const { id } = req.body;
  const order = await OrderModel.findOne({ where: { orderId: id } });

  let date = new Date();
  // let date1 = date.toLocaleString()

  order.status = 2;
  order.source = req.user.userId;
  order.confirmedAt = date;

  await order.save();

  res.send({
    sucess: true,
  });
}

async function addOrder(req, res) {
  let user;
  if (req.user.sapCode != "") {
    user = await UserModel.findOne({ where: { sapCode: req.user.sapCode } });
  } else {
    user = await UserModel.findOne({
      where: { username: req.user.username },
    });
  }
  if (user) {
    const order = await OrderModel.create({
      saleOrder: req.body.saleOrder || "",
      deliveryOrder: "",
      status: 1,
      source: 0,
      createdBy: user.userId,
    });
    order.save();

    for (let i = 0; i < req.body.length; i++) {
      let cylinder = await CylinderModel.findOne({
        where: { code: req.body[i].code },
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

async function deleteOrder(req, res) {
  const { orderId } = req.body;

  const order = await OrderModel.findOne({ where: { orderId: orderId } });

  const orderDetails = await OrderDetailsModel.findAll({
    where: { orderId: orderId },
  });
  // console.log(orderDetails);
  for (let i = 0; i < orderDetails.length; i++) {
    let cylinder = await CylinderModel.findOne({
      where: { cylinderId: orderDetails[i].cylinderId },
    });
    cylinder.status = 1;
    cylinder.save();
    orderDetails[i].destroy();
  }
  order.destroy();

  res.send({
    success: true,
  });
}
module.exports = {
  create,
  list,
  get,
  filter,
  saveOrder,
  addOrder,
  deleteOrder,
};
