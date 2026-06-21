const router = require('express').Router()
const ctrl   = require('../controllers/adminController')
const { protect, authorize } = require('../middleware/auth')

router.use(protect, authorize('admin'))

router.get('/ideas',            ctrl.getAllIdeas)
router.put('/ideas/:id/approve', ctrl.approveIdea)
router.put('/ideas/:id/reject',  ctrl.rejectIdea)
router.get('/stats',            ctrl.getStats)

module.exports = router