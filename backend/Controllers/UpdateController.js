exports.updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    if (!idea) return res.status(404).json({ message: 'Idea not found' })

    if (idea.entrepreneur.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const { title, summary, description, category, targetMarket, fundingGoal, teamMembers, image, roadmap } = req.body

    if (title)                    idea.title        = title
    if (summary)                  idea.summary      = summary
    if (description !== undefined) idea.description = description
    if (category)                 idea.category     = category
    if (targetMarket !== undefined) idea.targetMarket = targetMarket
    if (fundingGoal !== undefined) idea.fundingGoal  = fundingGoal
    if (teamMembers) {
      idea.teamSize    = teamMembers   
      idea.teamMembers = teamMembers
    }
    if (image)   idea.image   = image
    if (roadmap) {
  idea.roadmap = roadmap
  idea.markModified('roadmap')  
}

    const updated = await idea.save()
    res.json({ idea: updated })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}