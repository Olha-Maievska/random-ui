import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './modules/auth/pages/login.page'
import { PrivateRoute } from './modules/auth/components/private-route.components'
import Layout from './components/layout.components'

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout></Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
