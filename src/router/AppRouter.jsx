import { Route, Routes } from "react-router-dom"

import { Login, Register } from "../components/auth"

import { Perfil } from "../components/perfil"
import { Visualizar } from "../components/reservaciones"

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* rutas públicas */}
        <Route path="login/*" element={<Login />}/>
        <Route path="register/*" element={<Register />}/>
        {/* rutas privadas */}
        <Route path="/*" element={<Hola />} />
        <Route path="perfil/*" element={<Perfil/>} />
        <Route path="reservaciones/visualizar" element={<Visualizar/>} />
      </Routes>
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