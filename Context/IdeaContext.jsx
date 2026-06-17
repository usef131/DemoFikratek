import { createContext, useContext, useState, useCallback } from 'react'
import { ideaService } from '../services/ideaService'

const IdeaContext = createContext(null)

export function IdeaProvider({ children }) {
  const [ideas, setIdeas]         = useState([])
  const [loading, setLoading]     = useState(false)
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 })

  const fetchIdeas = useCallback(async (filters = {}) => {
    setLoading(true)
    try {
      const data = await ideaService.getIdeas(filters)
      setIdeas(data.ideas)
      setPagination({ page: data.page, total: data.total, pages: data.pages })
    } finally {
      setLoading(false)
    }
  }, [])

  const addIdea = (idea) => setIdeas(prev => [idea, ...prev])

  const updateIdeaInList = (id, updates) =>
    setIdeas(prev => prev.map(i => i._id === id ? { ...i, ...updates } : i))

  const removeIdea = (id) =>
    setIdeas(prev => prev.filter(i => i._id !== id))

  return (
    <IdeaContext.Provider value={{
      ideas, loading, pagination,
      fetchIdeas, addIdea, updateIdeaInList, removeIdea
    }}>
      {children}
    </IdeaContext.Provider>
  )
}

export const useIdeas = () => {
  const ctx = useContext(IdeaContext)
  if (!ctx) throw new Error('useIdeas must be used inside IdeaProvider')
  return ctx
}
