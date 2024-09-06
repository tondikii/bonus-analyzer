const {calculatePerformanceScore} = require("../helpers/utils");

const {
  PerformanceReport,
  Performance,
  Score,
  Criterion,
  Employee,
} = require("../models");

const {Parser} = require("json2csv"); // npm install json2csv
const fs = require("fs");
const path = require("path");

const createPerformanceReport = async (req, res) => {
  try {
    const {period, performances} = req.body;

    // Create Performance Report
    const performanceReport = await PerformanceReport.create({period});

    const criterion = await Criterion.findAll({order: [["weight", "DESC"]]});

    const performancesWithFinalScore = calculatePerformanceScore({
      performances,
      criterion,
    });

    // Create Performances and Scores
    for (const performance of performancesWithFinalScore) {
      const {employeeId, finalScore} = performance;
      const scores =
        performances.find((e) => e?.employeeId === employeeId)?.scores || [];
      const createdPerformance = await Performance.create({
        PerformanceReportId: performanceReport.id,
        EmployeeId: employeeId,
        finalScore,
      });

      for (const score of scores) {
        await Score.create({
          PerformanceId: createdPerformance.id,
          CriterionId: score.criterionId,
          score: score.score,
        });
      }
    }

    return res
      .status(201)
      .json({message: "Performance report created successfully"});
  } catch (err) {
    next(err);
  }
};

const fetchPerformanceReport = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10; // limit length of the products
    const page = req.query.page >= 1 ? req.query.page : 1;
    const offset = (page - 1) * limit; // indeks start from

    const where = {};

    const createdPerformanceReport = await PerformanceReport.findAndCountAll({
      limit,
      offset,
      where,
      include: [
        {
          model: Performance,
          include: [
            {
              model: Employee,
            },
          ],
        },
      ],
      order: [[Performance, "finalScore", "DESC"]],
    });

    res.status(200).json(createdPerformanceReport);
  } catch (err) {
    next(err);
  }
};

const deletePerformanceReport = async (req, res, next) => {
  try {
    const {id} = req.params;

    const foundPerformanceReport = await PerformanceReport.findByPk(id);

    if (!foundPerformanceReport) throw {name: "PerformanceReport not found"};

    await PerformanceReport.destroy({
      where: {id},
    });

    res.status(200).json({message: `Success delete employee with id ${id}`});
  } catch (err) {
    next(err);
  }
};

const downloadPerformanceReport = async (req, res, next) => {
  try {
    const {id} = req.params;

    // Fetch the PerformanceReport with associated Performances and Employees
    const report = await PerformanceReport.findByPk(id, {
      include: [
        {
          model: Performance,
          include: [
            {
              model: Employee,
            },
          ],
        },
      ],
    });

    if (!report) {
      throw {name: "PerformanceReport not found"};
    }

    const formattedPeriod = new Intl.DateTimeFormat("id", {
      month: "long",
      year: "numeric",
    }).format(report?.period);

    // Prepare data for CSV
    const data = report.Performances.map((performance, idx) => ({
      No: idx + 1,
      "Nama Karyawan": performance.Employee.name,
      Hasil: performance.finalScore,
      Periode: formattedPeriod,
    }));

    // Define CSV fields
    const fields = ["No", "Nama Karyawan", "Hasil", "Periode"];
    const json2csvParser = new Parser({fields});
    const csv = json2csvParser.parse(data);

    // Set headers
    res.setHeader("Content-Type", "text/csv");

    // Send CSV data
    res.send(csv);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  createPerformanceReport,
  fetchPerformanceReport,
  deletePerformanceReport,
  downloadPerformanceReport,
};
