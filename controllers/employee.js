const {Op} = require("sequelize");
const {Employee, sequelize} = require("../models");

const fetchEmployees = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit || 10);
    const page = req.query.page >= 1 ? req.query.page : 1;
    const search = req.query.search;

    const offset = (page - 1) * limit;

    const where = {};

    if (search) {
      where.name = {[Op.iLike]: `%${search}%`};
    }

    let pagination = {
      limit,
      offset,
    };

    if (limit === -1) {
      pagination = {};
    }

    const criteria = await Employee.findAndCountAll({
      ...pagination,
      where,
      order: [
        [
          sequelize.literal('CAST(SUBSTRING("identityNumber", 2) AS INTEGER)'),
          "ASC",
        ],
      ],
    });

    res.status(200).json(criteria);
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const {name} = req.body;

    const [latestEmployee] = await Employee.findAll({
      limit: 1,
      order: [
        [
          sequelize.literal('CAST(SUBSTRING("identityNumber", 2) AS INTEGER)'),
          "DESC",
        ],
      ],
    });

    const identityNumber = `A${
      Number(latestEmployee?.identityNumber.substring(1)) + 1
    }`;
    const createdEmployee = await Employee.create({
      name,
      identityNumber,
    });

    res.status(201).json(createdEmployee);
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const {id} = req.params;

    const foundEmployee = await Employee.findByPk(id);

    if (!foundEmployee) throw {name: "Employee not found"};

    const {name} = req.body;

    const updatedEmployee = await Employee.update(
      {
        name,
      },
      {where: {id}, returning: true, plain: true}
    );

    res.status(200).json(updatedEmployee[1]);
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const {id} = req.params;

    const foundEmployee = await Employee.findByPk(id);

    if (!foundEmployee) throw {name: "Employee not found"};

    await Employee.destroy({
      where: {id},
    });

    res.status(200).json({message: `Success delete employee with id ${id}`});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
