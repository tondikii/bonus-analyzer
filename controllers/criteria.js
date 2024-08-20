const {Criterion, Appraisal, sequelize} = require("../models");

const createCriteria = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const {name, weight, appraisals = []} = req.body;
    const criteria = await Criterion.create({
      name,
      weight,
    });

    const dataAppraisals = appraisals.map((appraisal) => ({
      ...appraisal,
      CriterionId: criteria.id,
    }));

    await Appraisal.bulkCreate(dataAppraisals, {
      fields: ["name", "weight", "CriterionId"],
    });

    await t.commit();

    res.status(201).json(criteria);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const fetchCriterion = async (req, res, next) => {
  try {
    const limit = req.query.limit || 6; // limit length of the products
    const page = req.query.page >= 1 ? req.query.page : 1;
    const offset = (page - 1) * limit; // indeks start from

    let where = {};

    const criteria = await Criterion.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Appraisal,
        },
      ],
      where,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(criteria);
  } catch (err) {
    next(err);
  }
};

const fetchCriteriaById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const criteria = await Criterion.findByPk(id);
    res.status(200).json(criteria);
  } catch (err) {
    next(err);
  }
};

const updateCriteria = async (req, res, next) => {
  try {
    const {id} = req.params;
    const foundCriterion = await Criterion.findByPk(id);
    if (!foundCriterion) throw {name: "Criterion not found"};
    const {name, weight} = req.body;
    const criteria = await Criterion.update(
      {
        name,
        weight,
      },
      {where: {id}, returning: true, plain: true}
    );
    res.status(200).json(criteria[1]);
  } catch (err) {
    next(err);
  }
};

const deleteCriteria = async (req, res, next) => {
  try {
    const {id} = req.params;
    const criteria = await Criterion.findByPk(id);
    if (!criteria) throw {name: "Criterion not found"};
    await Criterion.destroy({
      where: {id},
    });
    res.status(200).json({message: `Success delete criteria with id ${id}`});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCriteria,
  fetchCriterion,
  fetchCriteriaById,
  deleteCriteria,
  updateCriteria,
};
