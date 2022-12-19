import { useContext, createContext, useReducer } from "react";

export const adminContext = createContext();
export const useAdmin = () => {
  const context = useContext(adminContext);
  if (!context) throw new Error("No es un Adminprovider");
  return context;
}

const initialState = {
  customers: [],
  employees: [],
  roles: [],
}
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const cargarCustomers = (customers) => {
    dispatch({type:'cargar_customers',payload:customers})
  }
  const eliminarCustomer = (id) => {
    dispatch({type:'eliminar_customer',payload:id})
  }


  return (
    <adminContext.Provider
      value={{
        customers: state.customers,
        employees: state.employees,
        roles: state.roles,
        cargarCustomers,
        eliminarCustomer,

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
        customers: [...state.customers, action.payload]
      }
    case "eliminar_customer":
      return {
        ...state,
        customers: state.customers.filter(customer=>customer.idUsuario !== action.payload)
      }
    default:
      return state
  }
}