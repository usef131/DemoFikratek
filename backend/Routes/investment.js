const router = require('express').Router({ mergeParams: true })
const { createInvestment } = require('../controllers/investmentController')
const { protect, authorize } = require('../middleware/auth')

router.post('/', protect, authorize('investor'), createInvestment)

module.exports = router