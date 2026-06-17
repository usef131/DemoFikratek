import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../Services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser]       = useState()
  const [loading, setLoading] = useState(true)

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('fk_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('fk_user') }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const data = await authService.login(email, password)
    setUser(data.user)
    localStorage.setItem('fk_user', JSON.stringify(data.user))
    localStorage.setItem('fk_token', data.token)
    return data.user
  }

  const register = async (formData) => {
    const data = await authService.register(formData)
    setUser(data.user)
    localStorage.setItem('fk_user', JSON.stringify(data.user))
    localStorage.setItem('fk_token', data.token)
    return data.user
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fk_user')
    localStorage.removeItem('fk_token')
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('fk_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
