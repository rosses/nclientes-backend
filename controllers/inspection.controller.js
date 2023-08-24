const {
  InspectionModel,
  InspectionsDamageModel,
  InspectionsDefectModel,
  CylinderModel,
  sequelize,
} = require("../db");

async function create(req, res) {
  try {

    const cylinder = await CylinderModel.findOne({
      where: {
        code: req.body.code,
      },
    });

    const inspection = await InspectionModel.create({
      code: cylinder.code,
      cylinderId: cylinder.cylinderId,
      factoryId: req.body.factoryId,
      factoryName: req.body.factoryName,
      netWeight: req.body.netWeight,
      taraWeight: req.body.taraWeight,
      haveSeal: req.body.haveSeal,
      buildDate: req.body.buildDate,
      inspectDate: req.body.inspectDate || null,
      inspectValveDate: req.body.inspectValveDate || null,
      lastInspectId: req.body.lastInspectId,
      lastInspectName: req.body.lastInspectName,
      lastInspectAnother: req.body.lastInspectAnother,
      valve: req.body.valve,
      valveAnother: req.body.valveAnother,
      serie: req.body.serie,
      reInspectorId: req.body.reInspectorId,
      reInspectorName: req.body.reInspectorName
    });
    inspection.save();
    if (req.body.damages) {
      for (let i = 0; i < req.body.damages.length; i++) {
        const r = await InspectionsDamageModel.create({
          inspectionId: inspection.inspectionId,
          damageId: req.body.damages[i].damageId,
          damageText: req.body.damages[i].name,
        });
        r.save();
      }
    }
    if (req.body.defects) {
      for (let i = 0; i < req.body.defects.length; i++) {
        const r = await InspectionsDefectModel.create({
          inspectionId: inspection.inspectionId,
          defectId: req.body.defects[i].defectId,
          defectText: req.body.defects[i].name,
        });
        r.save();
      }
    }

    cylinder.inspectionId = inspection.inspectionId;
    cylinder.save();

    res.send({ success: true, data: inspection });
  } catch (err) {
    console.log(err);
    res.send({ success: false, err: err });
  }
}
async function fromCylinder(req, res) {
  try {
    const cylinder = await CylinderModel.findOne({
      where: {
        cylinderId: req.params.cylinderId,
      },
    });

    const inspectionObject = await InspectionModel.findOne({
      where: {
        inspectionId: cylinder.inspectionId,
      },
    });

    const damages = await sequelize.query(
      "" +
        "SELECT ID.* " +
        "FROM Inspections I " +
        "INNER JOIN InspectionsDamages ID ON ID.inspectionId = I.inspectionId " +
        "WHERE ID.inspectionId = :inspectionId",
      {
        raw: true,
        replacements: { inspectionId: inspectionObject.inspectionId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const defects = await sequelize.query(
      "" +
        "SELECT ID.* " +
        "FROM Inspections I " +
        "INNER JOIN InspectionsDefects ID ON ID.inspectionId = I.inspectionId " +
        "WHERE ID.inspectionId = :inspectionId",
      {
        raw: true,
        replacements: { inspectionId: inspectionObject.inspectionId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    let inspection = JSON.parse(JSON.stringify(inspectionObject));
    inspection.damages = JSON.parse(JSON.stringify(damages));
    inspection.defects = JSON.parse(JSON.stringify(defects));

    res.send({ success: true, data: inspection });
  } catch (err) {
    console.log(err);
    res.send({ success: false, err: err });
  }
}
module.exports = {
  create,
  fromCylinder,
};
