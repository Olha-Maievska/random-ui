import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './modules/auth/pages/login.page'
import { PrivateRoute } from './modules/auth/components/private-route.components'
import ListEmployees from './modules/employees/pages/list-employees.page'
import Layout from './components/layout.components'
import EmployeeInfo from './modules/employees/pages/employee-info.page'
import EmployeeEdit from './modules/employees/pages/employee-edit.page'

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ListEmployees />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/:id"
          element={
            <PrivateRoute>
              <EmployeeInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/:id/edit"
          element={
            <PrivateRoute>
              <EmployeeEdit />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
