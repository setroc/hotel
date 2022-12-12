import { Route, Routes } from "react-router-dom"

import { Login, Register } from "../components/auth"

import { Perfil } from "../components/perfil"
import { Visualizar } from "../components/reservaciones"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"

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
            <Register />
          </PublicRoute>
        }
      />
      <Route path="perfil/*" 
        element={
          <PublicRoute>
            <Perfil />
          </PublicRoute>
        }
      />

      {/* rutas privadas */}
      <Route
        path="/"
        element={ <PrivateRoute roles={['admin', 'trabajador', 'cliente']}/> }
      >
        <Route path="/" element={<Hola />} />
        <Route path="admin" element={<PrivateRoute roles={['admin']} />} >
          <Route path="customer" element={<Register />} />
        </Route>

        <Route path="404" element={<Error404 />} />

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