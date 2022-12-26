import { useContext, createContext, useReducer } from "react";

const initialState = {
  customers: [],
  employees: [],
  roles: [],
  typeRooms: [],
}
export const adminContext = createContext(initialState);
export const useAdmin = () => {
  const context = useContext(adminContext);
  if (!context) throw new Error("No es un Adminprovider");
  return context;
}

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Customers
  const cargarCustomers = (customers=[]) => {
    if ( customers.length>0 ) {
      dispatch({type:'cargar_customers',payload:customers});
    }
  }
  const eliminarCustomer = (id) => {
    dispatch({type:'eliminar_customer',payload:id});
  }

  // Employees
  const cargarEmployees = (employees=[]) => {
    if ( employees.length>0 ) {
      dispatch({type:'cargar_employees',payload:employees});
    }
  }
  const eliminarEmployee = (id) => {
    dispatch({type:'eliminar_employee',payload:id});
  }
  
  // Roles
  const cargarRoles = (roles=[]) => {
    if ( roles.length>0 ) {
      dispatch({type:'cargar_roles',payload:roles});
    }
  }
  const eliminarRole = (id) => {
    dispatch({type:'eliminar_role',payload:id});
  }
  
  // TypeRooms
  const cargarTypeRooms = (typeRooms=[]) => {
    if ( typeRooms.length>0 ) {
      dispatch({type:'cargar_typeRooms', payload:typeRooms});
    }
  } 
  const eliminarTypeRoom = (id) => {
    dispatch({type:'eliminar_typeRoom',payload:id});
  }



  return (
    <adminContext.Provider
      value={{
        customers: state.customers,
        employees: state.employees,
        roles: state.roles,
        typeRooms: state.typeRooms,
        cargarCustomers,
        eliminarCustomer,
        cargarEmployees,
        eliminarEmployee,
        cargarRoles,
        eliminarRole,
        cargarTypeRooms,
        eliminarTypeRoom,

      }}
    >
      {children}
    </adminContext.Provider>
  )
}

const adminReducer = (state, action) => {
  switch(action.type) {
    case "cargar_customers":
      return {
        ...state,
        customers: action.payload
      }
    case "eliminar_customer":
      return {
        ...state,
        customers: state.customers.filter(customer=>customer.idUsuario !== action.payload)
      }
    case "cargar_employees":
      return {
        ...state,
        employees: action.payload
      }
    case "eliminar_employee":
      return {
        ...state,
        employees: state.employees.filter(employee=>employee.idUsuario !== action.payload)
      }
    case "cargar_roles":
      return {
        ...state,
        roles: action.payload
      }
    case "eliminar_role":
      return {
        ...state,
        roles: state.roles.filter(role=>role.idRol !== action.payload)
      }
    case "cargar_typeRooms":
      return {
        ...state,
        typeRooms: action.payload
      }
    case "eliminar_typeRoom":
      return  {
        ...state,
        typeRooms: state.typeRooms.filter(typeRoom=>typeRoom.idTipoHabitacion !== action.payload)
      }
    default:
      return state
  }
}