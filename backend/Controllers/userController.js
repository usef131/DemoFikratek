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