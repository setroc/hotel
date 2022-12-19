import { Link } from "react-router-dom"

export const Table = ({data, column, keyVal}) => {
  console.log({data})
  return (
    <table className="table">
      <thead>
        <tr>
          {
            column.map((item) => <TableHead item={item} />)
          }
          <th scope="col">Operaciones</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item)=> <TableRow key={item[keyVal]} item={item} column={column} keyVal={keyVal} /> )
        }
      </tbody>
    </table>
  )
}

const TableHead = ({item}) => <th scope="col">{item.heading}</th>
const TableRow = ({item, column, keyVal}) => {
  return (
    <tr>
      {
        column.map(columItem=><td style={{textTransform:'capitalize'}}>{item[`${columItem.value}`]}</td>)
      }
      <td className="d-flex justify-content-start">
        <Link to={`/admin/customer/${item[keyVal]}`} >[Editar]</Link>
        <button type="button" style={{color:'red'}} className="btn btn-link  py-0 border-0" onClick={()=>borrarCustomer(customer.idUsuario, customer.Nombre)}>[Borrar]</button>
      </td>
    </tr>
  )
}
