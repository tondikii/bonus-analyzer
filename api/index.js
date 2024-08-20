require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Routes
const routes = require("../routes");
app.use("/", routes);

// Error Handler
const errorHandler = require("../middlewares/errorHandler");
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
