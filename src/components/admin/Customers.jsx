import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export const Customers = () => {

  const [customers, setCustomers] = useState([]);

  const getCustomers = async () =>{
    try {
      const resp = await fetch('http://localhost:4000/api/v1/admin/customer',{
        credentials: 'include',
      })
      if ( resp.ok ) {
        const body = await resp.json();
        setCustomers(body);
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

  const borrarCustomer = async (id) => {
    try {
      const resp = await fetch(`http://localhost:4000/api/v1/admin/customer/${id}`,{method:'DELETE',credentials:'include'});
      if (resp.ok) {
        const body = await resp.json();
        console.log(body)
      }
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
                  <button type="button" className="btn btn-link  py-0 border-0" onClick={()=>borrarCustomer(customer.idUsuario)}>[Borrar]</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}