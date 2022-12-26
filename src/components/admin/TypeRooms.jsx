import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useAdmin, useAuth } from "../../context";
import { useFetch } from "../../hooks";

export const TypeRooms = () => {

  const { signout } = useAuth();
  const { typeRooms, cargarTypeRooms, eliminarTypeRoom } = useAdmin();
  const { borrar } = useFetch();

  const borrarTypeRoom = (id, nombre) => {
    try {
      Swal.fire({
        title: `¿Seguro que deseas eliminar a ${nombre}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const resp = await borrar(`${import.meta.env.VITE_URL}/api/v1/admin/typeroom/${id}`);
            if ( resp ) {
              return
            }
            throw new Error('Error al eliminar el tipo de cuarto');
          } catch (error) {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `El tipo de cuarto ${nombre} se ha eliminado correctamente`,
          })
          eliminarTypeRoom(id);
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getTypeRooms = async () =>{
    try {
      const resp = await fetch(`${import.meta.env.VITE_URL}/api/v1/admin/typeroom`,{
        credentials: 'include',
      })
      if ( resp.ok ) {
        const body = await resp.json();
        cargarTypeRooms(body)
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
    getTypeRooms()
  }, [])

  return (
    <div className="container flex-grow-1 mt-2">
      <h3 className="mb-2">Tipos de cuartos registrados</h3>
      <table className="table w-75 m-auto">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Número de camas</th>
            <th scope="col">Número de personas</th>
            <th scope="col">Precio por noche</th>
            <th scope="col">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {
            typeRooms.map((typeRoom,i)=>(
              <tr key={typeRoom.idTipoHabitacion}>
                <th scope="row">{i+1}</th>
                <td style={{textTransform:'capitalize'}}>{typeRoom.nombre}</td>
                <td style={{textTransform:'capitalize'}}>{typeRoom.numCamas}</td>
                <td style={{textTransform:'capitalize'}}>{typeRoom.numPersonas}</td>
                <td style={{textTransform:'capitalize'}}>$ {typeRoom.precio}</td>
                <td className="d-flex justify-content-start">
                  <Link to={`/admin/typeroom/${typeRoom.idTipoHabitacion}`} >[Editar]</Link>
                  <button type="button" style={{color:'red'}} className="btn btn-link  py-0 border-0" onClick={()=>borrarTypeRoom(typeRoom.idTipoHabitacion, typeRoom.nombre)}>[Borrar]</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}