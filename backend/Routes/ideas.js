const router = require('express').Router()
const ctrl   = require('../controllers/ideaController')
const { protect, authorize } = require('../middleware/auth')
const upload = require('../Middleware/upload')

// Public
router.get('/',    ctrl.getIdeas)
router.get('/my',  protect, authorize('entrepreneur'), ctrl.getMyIdeas)
router.get('/interested', protect, authorize('investor'), ctrl.getInterestedIdeas) 
router.get('/:id', ctrl.getIdeaById)

// Entrepreneur only
router.post('/', protect, authorize('entrepreneur'), ctrl.createIdea)
router.put('/:id', protect, authorize('entrepreneur'), ctrl.updateIdea)

// Investor only
router.post('/:id/interest',   protect, authorize('investor'), ctrl.expressInterest)
router.delete('/:id/interest', protect, authorize('investor'), ctrl.withdrawInterest)

module.exports = router




