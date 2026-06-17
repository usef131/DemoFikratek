import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { IdeaProvider } from './context/IdeaContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <IdeaProvider>
          <AppRoutes />
        </IdeaProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
