import { Route, Routes } from "react-router-dom"

import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"

import { Customers, Employees, Form, FormGenerico, Roles} from "../components/admin"
import { Login, Register } from "../components/auth"
import { Layout } from "../components/layout"

export const AppRouter = () => {
  return (
    <Routes>
      {/* rutas públicas */}
      <Route path="login/*" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route 
        path="register/*" 
        element={
          <PublicRoute>
            <Register 
              styles={{backgroundColor: '#508bfc'}} 
              role={3}
              url={'http://localhost:4000/api/v1/admin/customer'}
            />
          </PublicRoute>
        }
      />

      {/* rutas privadas */}
      <Route
        path="/"
        element={<Layout> <PrivateRoute roles={['administrador', 'trabajador', 'cliente']}/> </Layout>}
      >
        <Route path="/" element={<Hola />} />

        {/* Admin */}
        <Route path="admin" element={<PrivateRoute roles={['administrador']} />} >
          <Route path="customer">
            <Route path="registrar" element={<Form modo={true} tipo={2} url={`${import.meta.env.VITE_URL}/api/v1/admin/customer`}  />} />
            <Route path="todos" element={<Customers />} />
            <Route path=":id" element={<Form modo={false} tipo={2} url={`${import.meta.env.VITE_URL}/api/v1/admin/customer`} />} />
          </Route>
          <Route path="employee">
            <Route path="registrar" element={<Form modo={true} tipo={1} url={`${import.meta.env.VITE_URL}/api/v1/admin/employee`} />} />
            <Route path="todos" element={<Employees />} />
            <Route path=":id" element={<Form modo={false} tipo={1} url={`${import.meta.env.VITE_URL}/api/v1/admin/employee`} />} />
          </Route>
          <Route path="role">
            <Route path="registrar" element={<FormGenerico modo={true} tipo={0} url={`${import.meta.env.VITE_URL}/api/v1/admin/role`} />} />
            <Route path="todos" element={<Roles />} />
            <Route path=":id" element={<FormGenerico modo={false} tipo={0} url={`${import.meta.env.VITE_URL}/api/v1/admin/role`} />} />

          </Route>
        </Route>

        <Route path="*" element={<Error404 />} />

      </Route>
    </Routes>
  )
}

const Error404 = () => {
  return(
    <>
      <h1>Error 404</h1>
    </>
  )
}
const Hola = () => {
  return(
    <>
      <h1>Hola</h1>
    </>
  )
}