import { Link } from "react-router-dom"
import { useAuth } from "../../context/context"


export const Navbar = () => {
  const { user } = useAuth();
  const { user_role } = user;
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">Hotel</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            
            {
              //Navegación de admin
              user_role === 'administrador' && (
                <>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Trabajadores
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/admin/customer/registrar">Registrar</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/admin/customer/todos">Listar todos</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Clientes
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/admin/customer/registrar">Registrar</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/admin/customer/todos">Listar todos</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Roles
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/admin/customer/registrar">Registrar</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/admin/customer/todos">Listar todos</Link></li>
                    </ul>
                  </li>
                </>
              )
            }

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Cerrar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}