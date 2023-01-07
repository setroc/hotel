import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";

import { useAuth } from "../../context";

export const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();

  const onSubmit = async (formData) => {
    await login(formData,`${import.meta.env.VITE_URL}/api/v1/auth/login`);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="vh-100" style={{backgroundColor: '#508bfc'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Iniciar sesión</h3>

                <div className="mb-3">
                  <label className="form-label text-start w-100">
                    Correo
                    <input 
                      placeholder="micorreo@dominio.com" 
                      type="email" 
                      className="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default" 
                      { ...register("email",{required:true})}
                    />
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label text-start w-100">
                    Contraseña
                    <input 
                      placeholder="" 
                      type="password" 
                      className="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default" 
                      { ...register("password",{required:true})}
                    />
                  </label>
                </div>
                <div className="d-grid gap-3">
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Iniciar sesión</button>
                  <Link className="align-self-end" to="/register">Crear cuenta</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}