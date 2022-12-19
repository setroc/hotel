import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useFetch } from "../../hooks";

const column = [
  {heading: 'Nombre', value: 'Nombre'},
  {heading: 'Área', value:'area'}
]

export const Employees = () => {
  const { borrar } = useFetch();

  const [employees, setEmployees] = useState([]);
  const getEmployes = async () =>{
    try {      
      const resp = await fetch(`${import.meta.env.VITE_URL}/api/v1/admin/employee`,{
        credentials: 'include',
      })
      if ( resp.ok ) {
        const body = await resp.json();
        setEmployees(Object.entries(body).length === 0 ? [] : body);
        return body;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEmployes();
  }, [])

  const borrarEmployee = async (id, nombre) => {
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
            const resp = await borrar(`${import.meta.env.VITE_URL}/api/v1/admin/employee/${id}`);
            if ( resp ) {
              return
            }
            throw new Error('Error al eliminar al trabajador');
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
            title: `El trabajador ${nombre} se ha eliminado correctamente`,
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div className="container flex-grow-1 mt-2">
      <h3 className="mb-2">Trabajadores registrados</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Área</th>
            <th scope="col">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((employee,i)=>(
              <tr key={employee.idUsuario}>
                <th scope="row">{i+1}</th>
                <td style={{textTransform:'capitalize'}}>{employee.Nombre}</td>
                <td style={{textTransform:'capitalize'}}>{employee.area}</td>
                <td className="d-flex justify-content-start">
                  <Link to={`/admin/employee/${employee.idUsuario}`} >[Editar]</Link>
                  <button type="button" style={{color:'red'}} className="btn btn-link py-0 border-0" onClick={()=>borrarEmployee(employee.idUsuario, employee.Nombre)}>[Borrar]</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}