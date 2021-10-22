const express = require("express");
const router = express.Router();

const {
  getAllCompanies,
  createCompany,
  updateCompanyById,
  deleteCompanyById,
} = require("../controllers/company.controller");


router.get("/", getAllCompanies);
router.post("/", createCompany);
router.put("/:id", updateCompanyById);
router.delete("/:id", deleteCompanyById);

module.exports = router;