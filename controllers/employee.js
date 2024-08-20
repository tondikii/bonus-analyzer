const {Employee} = require("../models");

const fetchEmployees = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10; // limit length of the products
    const page = req.query.page >= 1 ? req.query.page : 1;
    const offset = (page - 1) * limit; // indeks start from

    let where = {};

    const criteria = await Employee.findAndCountAll({
      limit,
      offset,
      where,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(criteria);
  } catch (err) {
    next(err);
  }
};

module.exports = {fetchEmployees};
