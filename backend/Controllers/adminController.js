const Idea = require('../models/Idea')
const User = require('../models/User')

// GET /api/admin/ideas
exports.getAllIdeas = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const filter = status ? { status } : {}
    const skip   = (Number(page) - 1) * Number(limit)
    const total  = await Idea.countDocuments(filter)
    const ideas  = await Idea.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('entrepreneur', 'name email')

    res.json({ ideas, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/admin/ideas/:id/approve
exports.approveIdea = async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', rejectionReason: '' },
      { new: true }
    )
    if (!idea) return res.status(404).json({ message: 'Idea not found' })
    res.json({ idea })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PUT /api/admin/ideas/:id/reject
exports.rejectIdea = async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', rejectionReason: req.body.reason || '' },
      { new: true }
    )
    if (!idea) return res.status(404).json({ message: 'Idea not found' })
    res.json({ idea })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const [totalIdeas, pending, approved, rejected, totalUsers, investors, entrepreneurs] =
      await Promise.all([
        Idea.countDocuments(),
        Idea.countDocuments({ status: 'pending' }),
        Idea.countDocuments({ status: 'approved' }),
        Idea.countDocuments({ status: 'rejected' }),
        User.countDocuments(),
        User.countDocuments({ role: 'investor' }),
        User.countDocuments({ role: 'entrepreneur' }),
      ])
    res.json({ totalIdeas, pending, approved, rejected, totalUsers, investors, entrepreneurs })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
