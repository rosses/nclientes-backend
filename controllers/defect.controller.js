const { User, Profile, CylinderModel, DefectModel, CylinderReasonModel } = require("../db");

async function create(req, res) {
    try {
        const cylinder = await CylinderModel.create({
            code: req.body.code,
            material: req.body.material,
            anotherObservation: req.body.anotherObservation,
            haveSeal: req.body.haveSeal,
            firstWeight: req.body.firstWeight,
            createdBy: req.user.userId,
            status: 1
        });
        cylinder.save();
        if (req.body.reasons) {
            for (let i = 0; i < req.body.reasons.length; i++) {
                const r = await CylinderReasonModel.create({
                    cylinderId: cylinder.cylinderId,
                    reasonId: req.body.reasons[i].reasonId,
                    reasonText: req.body.reasons[i].name
                });
                r.save();
            }
        }
       res.send({success:true, data: cylinder});
    } catch (err) {
        console.log(err);
        res.send({success:false, err: err});
    }
}
async function list(req, res) {
    try {
        const defects = await DefectModel.findAll();
        res.send({success:true, data: defects});
    } catch (err) {
        console.log(err);
        res.send({success:false, err: err});
    }
}


module.exports = {
    create,
    list
};