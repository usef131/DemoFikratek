import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../Context/AuthContext'
import { IdeaProvider } from '../Context/IdeaContext'
import AppRoutes from '../Routes/AppRoutes'

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
