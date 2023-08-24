const Sequelize = require("sequelize");
const config = require("./config/config");
const cliente = require("./models/cliente");
/*

const Profile = require("./models/profile");
const Cylinder = require("./models/cylinder");
const Reason = require("./models/reason");
const Defect = require("./models/defect");
const Order = require("./models/order");
const CylinderReason = require("./models/cylinderReason");
const OrderDetail = require("./models/orderdetail");
const Factory = require("./models/factory");
const Inspection = require("./models/inspection");
const Damage = require("./models/damage");
const Inspector = require("./models/inspector");
const InspectionsDamage = require("./models/inspectionsDamage");
const InspectionsDefect = require("./models/inspectionsDefect");
const ReInspector = require("./models/reInspector");
*/

// initialize database connection
const sequelize = new Sequelize(
  config.db.name, // database name
  config.db.user, // user
  config.db.password, // password
  {
    host: config.db.host,
    dialect: config.db.dialect,
    timezone: "+00:00", // set time zone to UTC
  }
);
// check database connection
sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.error("Unable to connect to the database:", err);
  });
  const ClienteModel = cliente(sequelize, Sequelize.DataTypes);
  /*
const ProfileModel = Profile(sequelize, Sequelize.DataTypes);
const CylinderModel = Cylinder(sequelize, Sequelize.DataTypes);
const OrderModel = Order(sequelize, Sequelize.DataTypes);
const OrderDetailsModel = OrderDetail(sequelize, Sequelize.DataTypes);
const ReasonModel = Reason(sequelize, Sequelize.DataTypes);
const DefectModel = Defect(sequelize, Sequelize.DataTypes);
const FactoryModel = Factory(sequelize, Sequelize.DataTypes);
const CylinderReasonModel = CylinderReason(sequelize, Sequelize.DataTypes);
const DamageModel = Damage(sequelize, Sequelize.DataTypes);
const InspectorModel = Inspector(sequelize, Sequelize.DataTypes);
const InspectionModel = Inspection(sequelize, Sequelize.DataTypes);
const InspectionsDamageModel = InspectionsDamage(
  sequelize,
  Sequelize.DataTypes
);
const InspectionsDefectModel = InspectionsDefect(
  sequelize,
  Sequelize.DataTypes
);
const ReInspectorModel = ReInspector(sequelize, Sequelize.DataTypes);
*/


module.exports = {
  ClienteModel,
  /*
  UserModel,
  ProfileModel,
  ReasonModel,
  OrderModel,
  CylinderModel,
  CylinderReasonModel,
  DefectModel,
  FactoryModel,
  OrderDetailsModel,
  InspectionModel,
  InspectorModel,
  DamageModel,
  InspectionsDefectModel,
  InspectionsDamageModel,
  ReInspectorModel,*/
  sequelize,
};
