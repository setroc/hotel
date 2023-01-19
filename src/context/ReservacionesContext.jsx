import { useContext, createContext, useReducer } from "react";
import Swal from "sweetalert2";

const initialState = {
  allReservations: [],
  activeReservations: [],
  availableRooms: [],
}
export const reservacionesContext = createContext(initialState);
export const useReservaciones = () => {
  const context = useContext(reservacionesContext);
  if (!context) throw new Error("No es un Reservacionesprovider");
  return context;
}

export const ReservacionesProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reservacionesReducer, initialState);

  const cargarAllReservations = async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_URL}/api/v1/reservation`,{
        credentials:'include'
      })
      const body = await resp.json();
      dispatch({type:'cargarAllReservations',payload: body});
    } catch (error) {
      console.log(error)
    }
  }

  const cargarActiveReservations = async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_URL}/api/v1/reservation?active=true`,{
        credentials:'include'
      })
      const body = await resp.json();
      dispatch({type:'cargarActiveReservations',payload: body});
    } catch (error) {
      console.log(error);
    }
  }
  
  const cargarAvailableRooms = async (formData) => {
    try {
      const resp = await fetch('http://localhost:4000/api/v1/reservation/get-available-rooms',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':document.cookie.split('=')[1]
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    const body = await resp.json();
    dispatch({type:'cargarAvailableRooms',payload: body});
    } catch (error) {
      console.log(error);
    }
  }

  const reservarRoom = async (begin_date, end_date, room_id, user_id) => {
    try {
      const resp = await fetch('http://localhost:4000/api/v1/reservation',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN':document.cookie.split('=')[1]
        },
        credentials: 'include',
        body: JSON.stringify({
          begin_date,
          end_date,
          room_id,
          user_id
        })
      })
      Swal.fire({
        title: 'Se ha realizado la reservación correctamente'
      })
      dispatch({type:'removerAvailableRooms',payload:room_id});
      const body = await resp.json();
      console.log(body)
      return body;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <reservacionesContext.Provider value={{
      ...state,

      // Methods
      cargarAllReservations,
      cargarActiveReservations,
      cargarAvailableRooms,
      reservarRoom
    }}
    >
      {children}
    </reservacionesContext.Provider>
  )
}

const reservacionesReducer = (state, action) => {
  switch (action.type) {
    case 'cargarAllReservations':
      return {
        ...state,
        allReservations:  action.payload
      }
    case 'cargarActiveReservations':
      return {
        ...state,
        activeReservations:  action.payload
      }
    case 'cargarAvailableRooms':
      return {
        ...state,
        availableRooms:  action.payload
      }
    case 'removerAvailableRooms':
      return {
        ...state,
        availableRooms: state.availableRooms.filter(room=>room.idHabitacion !== action.payload)
      }
    default:
      return state;
  }
}