import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useAdmin, useAuth } from "../../context";
import { useFetch } from "../../hooks";

export const Rooms = () => {

  const { signout } = useAuth();
  const { rooms, cargarRooms, eliminarRoom } = useAdmin();
  const { borrar } = useFetch();

  const borrarRoom = (id, nombre) => {
    try {
      Swal.fire({
        title: `¿Seguro que deseas eliminar el cuarto ${nombre}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const resp = await borrar(`${import.meta.env.VITE_URL}/api/v1/admin/room/${id}`);
            if ( resp ) {
              return
            }
            throw new Error('Error al eliminar cuarto');
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
            title: `El cuarto ${nombre} se ha eliminado correctamente`,
          })
          eliminarRoom(id);
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getRooms = async () =>{
    try {
      const resp = await fetch(`${import.meta.env.VITE_URL}/api/v1/admin/room`,{
        credentials: 'include',
      })
      if ( resp.ok ) {
        const body = await resp.json();
        cargarRooms(body)
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
    getRooms()
  }, [])

  return (
    <div className="container flex-grow-1 mt-2">
      <h3 className="mb-2">Cuartos registrados</h3>
      <table className="table w-75 m-auto">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Tipo de habitación</th>
            <th scope="col">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {
            rooms.map((room,i)=>(
              <tr key={room.idHabitacion}>
                <th scope="row">{i+1}</th>
                <td style={{textTransform:'capitalize'}}>{room.nombre}</td>
                <td style={{textTransform:'capitalize'}}>{room.descripcion}</td>
                <td style={{textTransform:'capitalize'}}>{room.tipoHabitacion}</td>
                <td className="d-flex justify-content-start">
                  <Link to={`/admin/room/${room.idHabitacion}`} >[Editar]</Link>
                  <button type="button" style={{color:'red'}} className="btn btn-link  py-0 border-0" onClick={()=>borrarRoom(room.idHabitacion, room.nombre)}>[Borrar]</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}