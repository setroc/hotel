import { useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { useFetch } from "../../hooks/";

/*
  modo:
  True - Registrar
  False - Actualizar
  tipo:
  0 - role
  1 - trabajador
  2 - cliente
  3 - typeRoom
*/
const Usuario = {
  1: 'trabajador',
  2: 'cliente',
}
export const Form = ({modo,tipo,url}) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({defaultValues:{idRol:tipo === 1 ? 2 : 3}});
  const { registrar, actualizar } = useFetch();

  const onSubmit = async (formData) => {
    const {contrasenia1, ...data} = formData
    if ( modo ) { // Registro
      const val = await registrar(url, data);
      if (!val) { //error
        return Swal.fire({
          icon: 'error',
          title: `Error al registrar al ${Usuario[tipo]}.`,
          text: 'Algo fue mal!',
        })
      }
      reset();
      return Swal.fire({
        icon: 'success',
        title: `${Usuario[tipo]} registrado correctamente`,
        text: `El ${Usuario[tipo]} se registro correctamente`,
      })
    } else { // Actualizar
      await actualizar(`${url}/${id}`, data);
    }
  }

  const getCustomer = async (id) => {
  const resp = await fetch(`${url}/${id}`,{
      credentials: 'include'
    });
    const body = await resp.json();
    body.fechaNacimiento = new Date(body.fechaNacimiento).toJSON().slice(0,10)
    body.idRol = tipo === 1 ? 2 : 3
    delete body.idUsuario
    reset(body)
  }
  const {id} = useParams();
  useEffect(()=>{
    if (modo) {
      return
    }
    getCustomer(id)

  },[modo])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body w-100 p-4 text-center">
        <h3 className="mb-5">{modo?`Registrar ${Usuario[tipo]}`:`Actualizar ${Usuario[tipo]}`}</h3>
        <div className="mb-2">
          <label className="form-label text-start w-100">
            Nombre(s)
            <input 
              placeholder="Juan" 
              type="text" 
              className={`form-control ${errors.nombre && 'is-invalid'}`}
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
                  className={`form-control ${errors.apPaterno && 'is-invalid'}`}
  
                  { ...register("apPaterno",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                Apellido materno
                <input 
                  placeholder="Sosa" 
                  type="text" 
                  className={`form-control ${errors.apMaterno && 'is-invalid'}`} 
  
                  { ...register("apMaterno",{required:true})}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md text-start">
              <p className="mb-0">Género</p>
              <div className="form-check">
                <label className="form-check-label" >
                  <input 
                    className={`form-check-input ${errors.genero && 'is-invalid'}`}
                    type="radio" 
                    value="h"
                    { ...register("genero",{required:true})}
                  />
                  Hombre
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label" >
                  <input 
                    className={`form-check-input ${errors.genero && 'is-invalid'}`}
                    type="radio" 
                    value="f"
                    { ...register("genero",{required:true})}
                  />
                  Mujer
                </label>
              </div>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                Fecha de nacimiento
                <input 
                  type="date" 
                  className={`form-control ${errors.fechaNacimiento && 'is-invalid'}`}
  
                  aria-describedby="inputGroup-sizing-default"
                  { ...register("fechaNacimiento",{required:true})}
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
                  className={`form-control ${errors.telefono && 'is-invalid'}`}
  
                  { ...register("telefono",{required:true, maxLength:10, minLength:10})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                Número de emergencia
                <input 
                  placeholder="5532567290" 
                  type="number" 
                  className={`form-control ${errors.telefonoContactoEmergencia && 'is-invalid'}`}
  
                  { ...register("telefonoContactoEmergencia",{required:true, maxLength:10, minLength:10})}
                />
              </label>
            </div>
          </div>

          <label className="form-label text-start w-100">
            Nombre(s) del contacto de emergencia
            <input 
              placeholder="Juan" 
              type="text" 
              className={`form-control ${errors.nombreContactoEmergencia && 'is-invalid'}`}
              { ...register("nombreContactoEmergencia",{required:true})}
            />
          </label>
          <div className="row">
            <div className="col-md">
              <label className="form-label text-start w-100">
                Apellido paterno del contacto de emergencia
                <input 
                  placeholder="Perez" 
                  type="text" 
                  className={`form-control ${errors.apPaternoContactoEmergencia && 'is-invalid'}`}
  
                  { ...register("apPaternoContactoEmergencia",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                Apellido materno del contacto de emergencia
                <input 
                  placeholder="Sosa" 
                  type="text" 
                  className={`form-control ${errors.apMaternoContactoEmergencia && 'is-invalid'}`}
  
                  { ...register("apMaternoContactoEmergencia",{required:true})}
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
                CURP
                <input 
                  placeholder="XXXX999999XXXXXX11" 
                  type="text" 
                  className={`form-control ${errors.curp && 'is-invalid'}`}
  
                  { ...register("curp",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                RFC
                <input 
                  placeholder="XXXX999999XXXXXX11" 
                  type="text" 
                  className={`form-control ${errors.rfc && 'is-invalid'}`}
  
                  { ...register("rfc",{required:true})}
                />
              </label>
            </div>
          </div>

          <label className="form-label text-start w-100">
            Calle
            <input 
              placeholder="Duraznito" 
              type="text" 
              className={`form-control ${errors.calle && 'is-invalid'}`}
              { ...register("calle",{required:true})}
            />
          </label>
          <div className="row">
            <div className="col-md">
              <label className="form-label text-start w-100">
                No. Exterior
                <input 
                  placeholder="222" 
                  type="text" 
                  className={`form-control ${errors.numeroExterior && 'is-invalid'}`}
  
                  { ...register("numeroExterior",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                No. Interior
                <input 
                  placeholder="10" 
                  type="text" 
                  className={`form-control ${errors.numeroInterior && 'is-invalid'}`}
  
                  { ...register("numeroInterior",{required:true})}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <label className="form-label text-start w-100">
                Colonia
                <input 
                  placeholder="San Pedro" 
                  type="text" 
                  className={`form-control ${errors.colonia && 'is-invalid'}`}
  
                  { ...register("colonia",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                Estado
                <input 
                  placeholder="CDMX" 
                  type="text" 
                  className={`form-control ${errors.estado && 'is-invalid'}`}
  
                  { ...register("estado",{required:true})}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <label className="form-label text-start w-100">
                Alcaldía
                <input 
                  placeholder="Benito Juarez" 
                  type="text" 
                  className={`form-control ${errors.alcaldia && 'is-invalid'}`}
  
                  { ...register("alcaldia",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                Código Postal
                <input 
                  placeholder="06600" 
                  type="number" 
                  className={`form-control ${errors.codigoPostal && 'is-invalid'}`}
  
                  { ...register("codigoPostal",{required:true})}
                />
              </label>
            </div>
          </div>
        </div>

        {
          tipo === 1 && (
            <>
              <hr className="hr" />
              <div className="mb-2">
                <div className="row">
                  <div className="col-md">
                    <label className="form-label text-start w-100">
                      Sueldo
                      <input 
                        placeholder="100000" 
                        type="number" 
                        className={`form-control ${errors.salario && 'is-invalid'}`}
                        min="1"
                        step="any"
        
                        { ...register("salario",{required:true})}
                      />
                    </label>
                  </div>

                  <div className="col-md">
                    <label className="form-label text-start w-100">
                      Área
                      <select 
                        className="form-select"
                        {...register("idArea",{required:true})}  
                      >
                        <option value="1">Recepción</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) 
        }


        <hr className="hr" />

        <div className="mb-2"> 
          <label className="form-label text-start w-100">
            Correo
            <input 
              placeholder="micorreo@dominio.com" 
              type="email" 
              className={`form-control ${errors.correo && 'is-invalid'}`}
              { ...register("correo",{required:true})}
            />
          </label>

          <div className="row">
            <div className="col-md">
              <label className="form-label text-start w-100">
                Contraseña
                <input 
                  placeholder="" 
                  type="password" 
                  className={`form-control ${errors.contrasenia && 'is-invalid'}`}
                  { ...register("contrasenia",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                Repetir contraseña
                <input 
                  placeholder="" 
                  type="password" 
                  className={`form-control ${errors.contrasenia1 && 'is-invalid'}`}
                  { ...register("contrasenia1",{required:true})}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="d-grid gap-3">
          <button className="btn btn-primary btn-lg btn-block" type="submit">{modo ? 'Registrar':'Actualizar'}</button>
        </div>
      </div>
    </form>
  )
}