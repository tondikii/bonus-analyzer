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
    const limit = Number(req.query.limit || 10);
    const page = req.query.page >= 1 ? req.query.page : 1;
    const offset = (page - 1) * limit;

    let pagination = {
      limit,
      offset,
    };

    if (limit === -1) {
      pagination = {};
    }

    const criteria = await Criterion.findAndCountAll({
      ...pagination,
      include: [
        {
          model: Appraisal,
        },
      ],
      order: [
        ["weight", "DESC"],
        [Appraisal, "weight", "ASC"],
      ],
    });

    res.status(200).json(criteria);
  } catch (err) {
    next(err);
  }
};

const fetchCriteriaById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const criteria = await Criterion.findByPk(id, {
      include: [
        {
          model: Appraisal,
          order: [["weight", "ASC"]],
        },
      ],
    });

    res.status(200).json(criteria);
  } catch (err) {
    next(err);
  }
};

const updateCriteria = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const {id} = req.params; // Assume the criterion ID is passed as a URL parameter
    const {name, weight, appraisals = []} = req.body;

    // Find the existing criterion
    const criteria = await Criterion.findByPk(id);
    if (!criteria) {
      return res.status(404).json({error: "Criterion not found"});
    }

    // Update the criterion
    await criteria.update({name, weight}, {transaction: t});

    // Get the existing appraisals
    const existingAppraisals = await Appraisal.findAll({
      where: {CriterionId: id},
    });

    // Update, delete, and add appraisals
    const updatedAppraisals = appraisals.map(async (appraisal) => {
      if (appraisal.id) {
        // Update existing appraisal
        const existingAppraisal = existingAppraisals.find(
          (e) => e.id === appraisal.id
        );
        if (existingAppraisal) {
          return existingAppraisal.update(appraisal, {transaction: t});
        }
      } else {
        // Add new appraisal
        return Appraisal.create(
          {...appraisal, CriterionId: id},
          {transaction: t}
        );
      }
    });

    // Delete appraisals that were removed in the update
    const appraisalIdsToKeep = appraisals.filter((a) => a.id).map((a) => a.id);
    const appraisalsToDelete = existingAppraisals.filter(
      (existing) => !appraisalIdsToKeep.includes(existing.id)
    );
    await Promise.all(
      appraisalsToDelete.map((a) => a.destroy({transaction: t}))
    );

    // Wait for all updates/additions to finish
    await Promise.all(updatedAppraisals);

    await t.commit();

    res.status(200).json(criteria);
  } catch (err) {
    await t.rollback();
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
