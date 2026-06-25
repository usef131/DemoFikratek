const Investment = require('../models/Investments')
const Idea = require('../models/Idea')

exports.createInvestment = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    if (!idea) return res.status(404).json({ message: 'Idea not found' })

    const { fullName, company, linkedin, experience, amount, message } = req.body

    const investment = await Investment.create({
      idea: idea._id,
      investor: req.user._id,
      fullName, company, linkedin, experience, amount, message
    })

    idea.investments.push(investment._id)
    idea.fundingRaised = (idea.fundingRaised || 0) + Number(amount)
    await idea.save()

    res.status(201).json({ investment })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
