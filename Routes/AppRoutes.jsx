import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import MainLayout from '../components/layout/MainLayout'

import Home        from '../pages/Home/Home'
import Ideas       from '../pages/Ideas/Ideas'
import IdeaDetails from '../pages/IdeaDetails/IdeaDetails'
import CreateIdea  from '../pages/CreateIdea/CreateIdea'
import Profile     from '../pages/Profile/Profile'
import Login       from '../pages/Auth/Login'
import Register    from '../pages/Auth/Register'
import AdminPanel  from '../pages/Admin/AdminPanel'
import NotFound    from '../pages/NotFound'

function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/"         element={<Home />} />
        <Route path="/ideas"    element={<Ideas />} />
        <Route path="/ideas/:id" element={<IdeaDetails />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Entrepreneur only */}
        <Route path="/create-idea" element={
          <PrivateRoute roles={['entrepreneur']}>
            <CreateIdea />
          </PrivateRoute>
        } />

        {/* Any authenticated user */}
        <Route path="/profile"  element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        {/* Admin only */}
        <Route path="/admin"    element={
          <PrivateRoute roles={['admin']}>
            <AdminPanel />
          </PrivateRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
