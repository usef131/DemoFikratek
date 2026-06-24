import { createContext, useContext, useState, useCallback } from 'react'
import { ideaService } from '../Services/ideaService'

const IdeaContext = createContext(null)

export function IdeaProvider({ children }) {
  const [ideas, setIdeas]         = useState([])
  const [myIdeas, setMyIdeas]       = useState([])
  const [myIdeasLoading, setMyIdeasLoading] = useState(false) 
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

  const fetchMyIdeas= useCallback(async ()=>{
    setMyIdeasLoading(true)
    try{
      const data = await ideaService.getMyIdeas()
      setMyIdeas(data.ideas || [])
    } catch (error) {
      console.error('Error fetching my ideas:', error)
    } finally {
      setMyIdeasLoading(false)
    }
  },[])

  const addIdea = (idea) =>{ 
    setIdeas(prev => [idea, ...prev])
    setMyIdeas(prev => [idea, ...prev])
  }

  const updateIdeaInList = (id, updates) =>
    {setIdeas(prev => prev.map(i => i._id === id ? { ...i, ...updates } : i))}

  const removeIdea = (id) =>
    {
      setIdeas(prev => prev.filter(i => i._id !== id))
      setMyIdeas(prev => prev.filter(i => i._id !== id))
    }

  return (
    <IdeaContext.Provider value={{
      ideas, loading, pagination,myIdeas, myIdeasLoading,
      fetchIdeas, addIdea, updateIdeaInList, removeIdea,  fetchMyIdeas
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
