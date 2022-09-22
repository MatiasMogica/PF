const { Router } = require("express");
const {
  postReview,
  getAllReviews,
  deleteReviews,
  updateReviews,
  postLike,
  postDislike,
} = require("../controllers/reviews.controller");

const router = Router();

// Configurar los routers
router.get("/", getAllReviews);
router.post("/likes/:id", postLike);
router.post("/disLikes/:id", postDislike);
router.post("/:id", postReview);
router.put("/:id", updateReviews);
router.delete("/:id", deleteReviews);

module.exports = router;