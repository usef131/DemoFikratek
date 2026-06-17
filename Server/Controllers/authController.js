const jwt  = require('jsonwebtoken')
const User = require('../models/User')

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already registered' })

    if (!['entrepreneur', 'investor'].includes(role))
      return res.status(400).json({ message: 'Invalid role' })

    const user  = await User.create({ name, email, password, role })
    const token = signToken(user._id)

    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' })

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' })

    const token = signToken(user._id)
    res.json({ user, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getMe = async (req, res) => {
  res.json({ user: req.user })
}

exports.updateMe = async (req, res) => {
  try {
    const { name, bio } = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio },
      { new: true, runValidators: true }
    )
    res.json({ user })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id).select('+password')

    if (!(await user.comparePassword(currentPassword)))
      return res.status(400).json({ message: 'Current password is incorrect' })

    user.password = newPassword
    await user.save()
    const token = signToken(user._id)
    res.json({ message: 'Password changed', token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
