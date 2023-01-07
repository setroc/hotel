import { useEffect } from "react"

import { useReservaciones } from "../../context";

export const Reservaciones = () => {
  const { cargarActiveReservations, activeReservations: reservaciones } = useReservaciones();

  const getReservaciones = async () =>{
    cargarActiveReservations();
  }
  useEffect(() => {
    getReservaciones();
  }, [])
  

  return (
    <div className="container flex-grow-1 mt-2">
      <h3 className="mb-2">Reservaciones activas</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Habitación</th>
            <th scope="col">Fecha de inicio</th>
            <th scope="col">Fecha de fin</th>
            <th scope="col">Nombre del cliente</th>
          </tr>
        </thead>
        <tbody>
          {
            reservaciones.map((reservacion)=>(
              <tr key={reservacion.idReservacion}>
                <td style={{textTransform:'capitalize'}}>{reservacion.habitacion}</td>
                <td style={{textTransform:'capitalize'}}>{reservacion.fechaInicio}</td>
                <td style={{textTransform:'capitalize'}}>{reservacion.fechaFin}</td>
                <td style={{textTransform:'capitalize'}}>{reservacion.nombre} {reservacion.apPaterno} {reservacion.apMaterno}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}