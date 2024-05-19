const express = require('express')
const router = express.Router()
const reviewController = require("../controller/reviewController")

router.post('/',reviewController.createReview)
router.get("/",reviewController.getAllReviews)
router.put("/",reviewController.updateReview)
router.delete("/",reviewController.deleteReview)

module.exports = router