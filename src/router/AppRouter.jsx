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

      {/* rutas privadas */}
      <Route 
        path="/*" 
        element={
          <PrivateRoute role={'admin'}>
            <Hola />
          </PrivateRoute>
        } 
      />
      {/* <Route path="perfil/*" element={<Perfil/>} />
      <Route path="reservaciones/visualizar" element={<Visualizar/>} /> */}
    </Routes>
  )
}

const Hola = () => {
  return(
    <>
      <h1>Hola</h1>
    </>
  )
}