const {Appraisal} = require("../models");

const updateAppraisal = async (req, res, next) => {
  try {
    const {id} = req.params;
    const foundAppraisal = await Appraisal.findByPk(id);
    if (!foundAppraisal) throw {name: "Appraisal not found"};
    const {name, weight} = req.body;
    const appraisal = await Appraisal.update(
      {
        name,
        weight,
      },
      {where: {id}, returning: true, plain: true}
    );
    res.status(200).json(appraisal[1]);
  } catch (err) {
    next(err);
  }
};

const deleteAppraisal = async (req, res, next) => {
  try {
    const {id} = req.params;
    const appraisal = await Appraisal.findByPk(id);
    if (!appraisal) throw {name: "Appraisal not found"};
    await Appraisal.destroy({
      where: {id},
    });
    res.status(200).json({message: `Success delete appraisal with id ${id}`});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  deleteAppraisal,
  updateAppraisal,
};
