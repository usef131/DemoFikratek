import { Outlet } from 'react-router-dom'
import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer'

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
