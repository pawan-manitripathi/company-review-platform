import express from "express";

import {
  addReview,
  getReviews,
  likeReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:companyId", addReview);

router.get("/:companyId", getReviews);

router.patch("/like/:reviewId", likeReview);

export default router;