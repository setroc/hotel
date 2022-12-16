import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { useCustomer } from "../../hooks/";


// const initialValues = {
//   nombre: "Ivan",
//   apPaterno: "Martinez",
//   apMaterno: "Ramirez",
//   genero: "M",
//   fechaNacimiento: new Date().toJSON().slice(0,10),
//   telefono: "551578751",
//   telefonoContactoEmergencia:"144845135",
//   nombreContactoEmergencia:"Edgar",
//   apPaternoContactoEmergencia: "Ramirez",
//   apMaternoContactoEmergencia:"Fuentes",
//   curp: "IIIIIII",
//   rfc: "IIIIIII",
//   calle: "Durazno",
//   numeroExterior: "12",
//   numeroInterior: "3",
//   colonia: "la cruz",
//   estado: "CDMX",
//   alcaldia: "magdalena",
//   codigoPostal:"10800",
//   contrasenia: "12345",
//   contrasenia1: "12345",
//   correo: "ivan@mail.com",
//   idRol: 3,
// }
/*
  modo:
  True - Registrar
  False - Actualizar
*/
export const CustomerForm = ({modo,url}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { registrar, actualizar } = useCustomer();

  const onSubmit = async (formData) => {
    const {contrasenia1, ...data} = formData
    if ( modo ) { // Registro
      const val = await registrar(url, data);
      if (!val) { //error
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
      return Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        text: 'El usuario se registro correctamente',
      })
    } else { // Actualizar
      await actualizar(url, data);
    }
  }

  const getCustomer = async (id) => {
    const resp = await fetch(`http://localhost:4000/api/v1/admin/customer/${id}`,{
      credentials: 'include'
    });
    const body = await resp.json();
    reset(body)
  }
  const {id} = useParams();
  useEffect(()=>{
    if (modo) { // No viene id entonces es registro
      return
    }
    getCustomer(id)

  },[modo])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body w-100 p-4 text-center">
        <h3 className="mb-5">{modo?'Registrar cliente':'Actualizar cliente'}</h3>
        <div className="mb-2">
          <label className="form-label text-start w-100">
            Nombre(s)
            <input 
              placeholder="Juan" 
              type="text" 
              className={`form-control ${errors.nombre && 'is-invalid'}`}
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-default" 
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
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
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
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
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
                    value="H"
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
                    value="M"
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
                  aria-label="Sizing example input" 
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
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
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
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
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
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-default" 
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
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
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
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
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
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
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
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
                  { ...register("rfc",{required:true})}
                />
              </label>
            </div>
          </div>

          <label className="form-label text-start w-100">
            Calle
            <input 
              placeholder="Juan" 
              type="text" 
              className={`form-control ${errors.calle && 'is-invalid'}`}
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-default" 
              { ...register("calle",{required:true})}
            />
          </label>
          <div className="row">
            <div className="col-md">
              <label className="form-label text-start w-100">
                No. Exterior
                <input 
                  placeholder="Juan" 
                  type="text" 
                  className={`form-control ${errors.numeroExterior && 'is-invalid'}`}
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
                  { ...register("numeroExterior",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                No. Interior
                <input 
                  placeholder="Juan" 
                  type="text" 
                  className={`form-control ${errors.numeroInterior && 'is-invalid'}`}
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
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
                  placeholder="Juan" 
                  type="text" 
                  className={`form-control ${errors.colonia && 'is-invalid'}`}
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
                  { ...register("colonia",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                Estado
                <input 
                  placeholder="Juan" 
                  type="text" 
                  className={`form-control ${errors.estado && 'is-invalid'}`}
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
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
                  placeholder="Juan" 
                  type="text" 
                  className={`form-control ${errors.alcaldia && 'is-invalid'}`}
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
                  { ...register("alcaldia",{required:true})}
                />
              </label>
            </div>
            <div className="col-md">
              <label className="form-label text-start w-100">
                Código Postal
                <input 
                  placeholder="Juan" 
                  type="number" 
                  className={`form-control ${errors.codigoPostal && 'is-invalid'}`}
                  aria-label="Sizing example input" 
                  aria-describedby="inputGroup-sizing-default" 
                  { ...register("codigoPostal",{required:true})}
                />
              </label>
            </div>
          </div>
        </div>

        <hr className="hr" />

        <div className="mb-2"> 
          <label className="form-label text-start w-100">
            Correo
            <input 
              placeholder="micorreo@dominio.com" 
              type="email" 
              className={`form-control ${errors.correo && 'is-invalid'}`}
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-default" 
              { ...register("correo",{required:true})}
            />
          </label>

          {
            modo && (
              <>
                <div className="row">
                  <div className="col-md">
                    <label className="form-label text-start w-100">
                      Contraseña
                      <input 
                        placeholder="" 
                        type="password" 
                        className={`form-control ${errors.contrasenia && 'is-invalid'}`}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default" 
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
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default" 
                        { ...register("contrasenia1",{required:true})}
                      />
                    </label>
                  </div>
                </div>
              </>
            )
          }
        
        </div>

        <div className="d-grid gap-3">
          <button className="btn btn-primary btn-lg btn-block" type="submit">{modo ? 'Registrar':'Actualizar'}</button>
        </div>
      </div>
    </form>
  )
}