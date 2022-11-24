import { Route, Routes } from "react-router-dom"

import { Login, Register } from "../components/auth"

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* rutas públicas */}
        <Route path="login/*" element={<Login />}/>
        <Route path="register/*" element={<Register />}/>
        {/* rutas privadas */}
        <Route path="/*" element={<Hola />} />
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