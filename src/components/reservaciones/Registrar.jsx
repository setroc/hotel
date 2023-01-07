import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import { useAuth, useReservaciones } from "../../context";

const date = {
  begin_date: new Date().toLocaleString('lt',{timezone:'America/Mexico_City'}).split(' ')[0],
  end_date: new Date().toLocaleString('lt',{timezone:'America/Mexico_City'}).split(' ')[0]
}
const currentDate = new Date().toLocaleString('lt',{timezone:'America/Mexico_City'}).split(' ')[0];

export const Registrar = () => {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({defaultValues:date});
  const { cargarAvailableRooms, reservarRoom, availableRooms:rooms  } = useReservaciones();
  const { user_id, user_role } = useAuth();

  const onBuscarReservaciones = async (formData) => {
    const {begin_date, end_date} = formData;
    if ( begin_date >= end_date ) {
      Swal.fire({
        icon: 'error',
        title: `Revise las fechas de inicio y fin`,
        text: 'La fecha de inicio no puede ser mayor o igual a la fecha de fin.'
      })
      return
    }
    if ( begin_date === currentDate ) {
      Swal.fire({
        icon: 'error',
        title: `Revise las fechas de inicio y fin`,
        text: 'Debe realizar la reservación con días de antelación.'
      })
      return
    }
    cargarAvailableRooms(formData);
  }

  const onHandleReservacion = async (room_id) => {
    const { begin_date, end_date } = getValues();
    if ( user_role === 'cliente' ) {
      reservarRoom(begin_date, end_date, room_id, user_id);
      return;
    }
    reservarRoom(begin_date, end_date, room_id, 1);
  }

  return (
    <div className="container flex-grow-1 mt-2">
      <h3 className="mb-2">Registrar reservación</h3>
      <form onSubmit={handleSubmit(onBuscarReservaciones)} >
        <div className="row w-75 m-auto">
          <div className="col-md">
            <label className="form-label text-start w-100">
              Fecha inicial
              <input 
                type="date"
                min={date.begin_date} 
                className={`form-control`}
                timezone='America/Mexico_City'
                aria-describedby="inputGroup-sizing-default"
                { ...register("begin_date",{required:true})}
              />
            </label>
          </div>
          <div className="col-md">
            <label className="form-label text-start w-100">
              Fecha final
              <input 
                type="date" 
                className={`form-control`}
                min={date.begin_date }
                aria-describedby="inputGroup-sizing-default"
                { ...register("end_date",{required:true})}
              />
            </label>
          </div>
          <div className="col-md align-self-center">
            <button className="btn btn-primary btn-lg btn-block" type="submit">Buscar</button>
          </div>
        </div>
      </form>

      {
        rooms.length > 0 && (
          <table className="table m-auto w-75">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Tipo</th>
                <th scope="col">No. de camas</th>
                <th scope="col">No. de personas</th>
                <th scope="col">Precio por noche</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                rooms.map((room)=>(
                  <tr key={room.idHabitacion}>
                    <td style={{textTransform:'capitalize'}}>{room.nombre}</td>
                    <td style={{textTransform:'capitalize'}}>{room.nombreTipo}</td>
                    <td style={{textTransform:'capitalize'}}>{room.numCamas}</td>
                    <td style={{textTransform:'capitalize'}}>{room.numPersonas}</td>
                    <td style={{textTransform:'capitalize'}}>$ {room.precio}</td>
                    <td className="d-flex justify-content-start">
                      <button 
                        type="button"
                        style={{color:'blue'}}
                        className="btn btn-link  py-0 border-0"
                        onClick={()=>onHandleReservacion(room.idHabitacion)}
                      >
                        [Reservar]
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}