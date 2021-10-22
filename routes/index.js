var express = require('express');
var router = express.Router();

const jobApi = require("./job.api")
router.use("/jobs", jobApi)

const companyApi = require("./companies.api")
router.use("/companies", companyApi)

module.exports = router;
