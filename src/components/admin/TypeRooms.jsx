import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAdmin, useAuth } from "../../context";

export const TypeRooms = () => {

  const { signout } = useAuth();
  const { roles, cargarRoles, eliminarRole } = useAdmin();

  const borrarRole = () => {

  }

  const getRoles = async () =>{
    try {
      const resp = await fetch(`${import.meta.env.VITE_URL}/api/v1/admin/room`,{
        credentials: 'include',
      })
      if ( resp.ok ) {
        const body = await resp.json();
        cargarRoles(body)
        return;
      }
      if ( resp.status === 401 ) { // Token expiro
        return signout()
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <div className="container flex-grow-1 mt-2">
      <h3 className="mb-2">Tipos de cuartos registrados</h3>
      <table className="table w-75 m-auto">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {
            roles.map((role,i)=>(
              <tr key={role.idRol}>
                <th scope="row">{i+1}</th>
                <td style={{textTransform:'capitalize'}}>{role.nombre}</td>
                <td className="d-flex justify-content-start">
                  <Link to={`/admin/role/${role.idRol}`} >[Editar]</Link>
                  <button type="button" style={{color:'red'}} className="btn btn-link  py-0 border-0" onClick={()=>borrarRole(role.idRole, role.nombre)}>[Borrar]</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}