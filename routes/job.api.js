const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  createJob,
  updateJobById,
  deleteJobById,
} = require("../controllers/job.controller");


router.get("/", getAllJobs);
router.post("/", createJob);
router.put("/:id", updateJobById);
router.delete("/:id", deleteJobById);

module.exports = router;
