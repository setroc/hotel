import { Route, Routes } from "react-router-dom"

import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"

import { Customers } from "../components/admin"
import { Login, Register } from "../components/auth"
import { Layout } from "../components/layout"
import { Perfil } from "../components/perfil"
import { Visualizar } from "../components/reservaciones"

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
            <Route path="registrar" element={<Register titulo='Crear cuenta de cliente' role='admin' />} />
            <Route path="todos" element={<Customers />} />
            <Route path=":id" element={<Customers />} />
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