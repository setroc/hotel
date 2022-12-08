import { useContext } from "react";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";

import { AuthContext } from "../../auth";


const initialValues = {
  nombre: 'Juan',
  apellidoPaterno: 'Perez',
  apellidoMaterno: 'Soza',
  telefono: 5511223344,
  numEmergencia: 5566778899,
  email: 'correo@prueba.com',
  curp: 'NOSE223344DDFFRR11',
  fechaNacimiento: new Date().toJSON().slice(0,10),
  password: '1234',
  password1: '1234',
}

export const Register = () => {
  const {dispatch} = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues:initialValues});

  const onSubmit = (formData) => {
    const { password, password1 } = formData;
    if ( password != password1 ) {
      return console.error('Las contraseñas no coinciden');
    }
    const payload = {
      role: 'admin'
    }
    dispatch({type:'login', payload})

    console.log('registrado')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="vh-100" style={{backgroundColor: '#508bfc'}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center mh-100 overflow-auto">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 w-75">
            <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Crear cuenta</h3>
                <div className="mb-2">
                  <label className="form-label text-start w-100">
                    Nombre(s)
                    <input 
                      placeholder="Juan" 
                      type="text" 
                      className="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default" 
                      required
                      { ...register("nombre",{required:true})}
                    />
                  </label>
                  <div className="row">
                    <div className="col-md">
                      <label className="form-label text-start w-100">
                        Apellido paterno
                        <input 
                          placeholder="Perez" 
                          type="text" 
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
                          { ...register("apellidoPaterno",{required:true})}
                        />
                      </label>
                    </div>
                    <div className="col-md">
                      <label className="form-label text-start w-100">
                        Apellido materno
                        <input 
                          placeholder="Sosa" 
                          type="text" 
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
                          { ...register("apellidoMaterno",{required:true})}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                
                <hr className="hr" />

                <div className="mb-2">
                  <div className="row">
                    <div className="col-md">
                      <label className="form-label text-start w-100">
                        Número telefónico
                        <input 
                          placeholder="5546783920" 
                          type="number" 
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
                          { ...register("telefono",{required:true})}
                        />
                      </label>
                    </div>
                    <div className="col-md">
                      <label className="form-label text-start w-100">
                        Número de emergencia
                        <input 
                          placeholder="5532567290" 
                          type="number" 
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
                          { ...register("numEmergencia",{required:true})}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <label className="form-label text-start w-100">
                    Correo
                    <input 
                      placeholder="micorreo@dominio.com" 
                      type="email" 
                      className="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default" 
                      required
                      { ...register("email",{required:true})}
                    />
                  </label>
                  <label className="form-label text-start w-100">
                    CURP
                    <input 
                      placeholder="XXXX999999XXXXXX11" 
                      type="text" 
                      className="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default" 
                      required
                      { ...register("curp",{required:true})}
                    />
                  </label>
                  <label className="form-label text-start w-100">
                    Fecha de nacimiento
                    <input 
                      type="date" 
                      className="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default"
                      required
                      { ...register("fechaNacimiento",{required:true})}
                    />
                  </label>
                  <label className="form-label text-start w-100">
                    Contraseña
                    <input 
                      placeholder="" 
                      type="password" 
                      className="form-control" 
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default" 
                      required
                      { ...register("password",{required:true})}
                    />
                  </label>
                  <label className="form-label text-start w-100">
                    Repetir contraseña
                    <input 
                      placeholder="" 
                      type="password" 
                      className="form-control" 
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default" 
                      required
                      { ...register("password1",{required:true})}
                    />
                  </label>
                </div>

                <div className="d-grid gap-3">
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Crear cuenta</button>
                  <Link className="align-self-end" to="/login">Iniciar sesión</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}