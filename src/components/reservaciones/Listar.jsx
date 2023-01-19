import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useAdmin, useAuth } from "../../context";
import { useFetch } from "../../hooks";

export const Listar = () => {

  const {user } = useAuth();
  const [reservaciones, setReservaciones] = useState([]);

  const borrarReservacion = (id) => {
    try {
      Swal.fire({
        title: `¿Seguro que deseas eliminar la reservación?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const resp = await fetch(`${import.meta.env.VITE_URL}/api/v1/reservation/${id}`,{
              method: 'DELETE',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN':document.cookie.split('=')[1]
              },
              body: JSON.stringify({
                user_id: user.user_id,
                reservation_id: id
              })
            });
            if ( resp.ok ) {
              return
            }
            const body = await resp.json();
            throw new Error(`${body.message}`);
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
            title: `La reservación se ha eliminado correctamente`,
          })
          setReservaciones( prev => prev.filter( p => p.idReservacion !== id ) )
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getRooms = async () =>{
    try {
      const resp = await fetch(`${import.meta.env.VITE_URL}/api/v1/reservation/user/${user.user_id}`,{
        credentials: 'include',
      })
      if ( resp.ok ) {
        const body = await resp.json();
        setReservaciones(body);
        return;
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
      <h3 className="mb-2">Reservaciones activas</h3>
      <table className="table w-75 m-auto">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de inicio</th>
            <th scope="col">Fecha de fin</th>
            <th scope="col">Habitación</th>
            <th scope="col">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {
            reservaciones.map((reservacion,i)=>(
              <tr key={reservacion.idReservacion}>
                <th scope="row">{i+1}</th>
                <td style={{textTransform:'capitalize'}}>{reservacion.fechaInicio}</td>
                <td style={{textTransform:'capitalize'}}>{reservacion.fechaFin}</td>
                <td style={{textTransform:'capitalize'}}>{reservacion.habitacion}</td>
                <td className="d-flex justify-content-start">
                  {/* <Link to={`/admin/room/${reservacion.idHabitacion}`} >[Editar]</Link> */}
                  <button type="button" style={{color:'red'}} className="btn btn-link  py-0 border-0" onClick={()=>borrarReservacion(reservacion.idReservacion)}>[Cancelar]</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}