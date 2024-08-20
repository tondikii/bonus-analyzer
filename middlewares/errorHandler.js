const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({error: err.errors.map((el) => el.message)});
      break;
    case "Bad Request Sign In":
      res.status(400).json({error: "Email or Password is Required"});
      break;
    case "Invalid Email":
      res.status(400).json({error: "Invalid Email"});
      break;
    case "Invalid Password":
      res.status(400).json({error: "Invalid Password"});
      break;
    case "Unauthorized":
      res.status(401).json({error: "Invalid signature"});
      break;
    case "Criteria not found":
    case "Appraisal not found":
      res.status(400).json({error: err.name});
      break;
    default:
      res.status(500).json({error: "Internal server error"});
      break;
  }
};

module.exports = errorHandler;
