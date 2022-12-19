import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useFetch } from "../../hooks";


export const Customers = () => {

  const [customers, setCustomers] = useState([]);

  const { borrar } = useFetch();

  const getCustomers = async () =>{
    try {
      const resp = await fetch(`${import.meta.env.VITE_URL}/api/v1/admin/customer`,{
        credentials: 'include',
      })
      if ( resp.ok ) {
        const body = await resp.json();
        setCustomers(Object.entries(body).length === 0 ? [] : body);
        return body;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomers()
  }, [])

  const borrarCustomer = async (id, nombre) => {
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
            const resp = await borrar(`${import.meta.env.VITE_URL}/api/v1/admin/customer/${id}`);
            if ( resp ) {
              return
            }
            throw new Error('Error al eliminar al cliente');
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
            title: `El cliente ${nombre} se ha eliminado correctamente`,
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div className="container flex-grow-1 mt-2">
      <h3 className="mb-2">Clientes registrados</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {
            customers.map((customer,i)=>(
              <tr key={customer.idUsuario}>
                <th scope="row">{i+1}</th>
                <td style={{textTransform:'capitalize'}}>{customer.Nombre}</td>
                <td>{customer.correo}</td>
                <td>{customer.telefono}</td>
                <td className="d-flex justify-content-start">
                  <Link to={`/admin/customer/${customer.idUsuario}`} >[Editar]</Link>
                  <button type="button" style={{color:'red'}} className="btn btn-link  py-0 border-0" onClick={()=>borrarCustomer(customer.idUsuario, customer.Nombre)}>[Borrar]</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}