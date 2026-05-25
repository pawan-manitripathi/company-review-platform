import express from "express";

import {
  createCompany,
  getCompanies,
  getSingleCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.post("/", createCompany);

router.get("/", getCompanies);

router.get("/:id", getSingleCompany);

export default router;