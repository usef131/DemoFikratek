const User = require('../models/User')

exports.getInvestors = async (req, res) => {
  try {
    const investors = await User.find(
      { role: 'investor' }
    )

    res.json({ investors })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) return res.status(404).json({ message: 'User not found' })
        res.json({ user })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}