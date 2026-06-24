import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

import MainLayout from '../src/Components/Layout/MainLayout'

import Home from '../src/Pages/Home/Home'
import Ideas from '../src/Pages/Ideas/Ideas'
import IdeaDetails from '../src/Pages/IdeaDetails/IdeaDetails'
import CreateIdea from '../src/Pages/CreateIdea/CreateIdea'
import Profile from '../src/Pages/Profile/Profile'
import Login from '../src/Pages/Auth/Login'
import Register from '../src/Pages/Auth/Register'
import NotFound from '../src/Pages/NotFound/NotFound'
import HomePageTwo from '../src/Pages/HomePageTwo/HomePageTwo'
import Contact from '../src/Pages/contact/Contact'
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route path="/home-two" element={<HomePageTwo />} />
      <Route path="/contact" element={<Contact />} />


      <Route path="/ideas" element={<Ideas />} />
      <Route path="/ideas/:id" element={<IdeaDetails />} />

      {/* Any authenticated user */}
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />

      {/* Entrepreneur only */}
      <Route path="/create-idea" element={

        <CreateIdea />

      } />
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
