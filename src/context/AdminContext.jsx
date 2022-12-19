import { useContext, createContext, useReducer } from "react";

const initialState = {
  customers: [],
  employees: [],
  roles: [],
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
  const cargarCustomers = (customers) => {
    dispatch({type:'cargar_customers',payload:customers})
  }
  const eliminarCustomer = (id) => {
    dispatch({type:'eliminar_customer',payload:id})
  }

  // Employees
  const cargarEmployees = (employees) => {
    dispatch({type:'cargar_employees',payload:employees});
  }
  const eliminarEmployee = (id) => {
    dispatch({type:'eilimnar_employee',payload:id});
  }
  
  // Roles
  const cargarRoles = (roles) => {
    dispatch({type:'cargar_roles',payload:roles});
  }
  const eliminarRole = (id) => {
    dispatch({type:'eilimnar_role',payload:id});
  }



  return (
    <adminContext.Provider
      value={{
        customers: state.customers,
        employees: state.employees,
        roles: state.roles,
        cargarCustomers,
        eliminarCustomer,
        cargarEmployees,
        eliminarEmployee,
        cargarRoles,
        eliminarRole,

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
    case "eilimnar_employee":
      return {
        ...state,
        employees: state.employees.filter(employee=>employee.idUsuario !== action.payload)
      }
    case "cargar_roles":
      return {
        ...state,
        roles: action.payload
      }
    case "eilimnar_role":
      return {
        ...state,
        roles: state.roles.filter(role=>role.idRol !== action.payload)
      }
    default:
      return state
  }
}