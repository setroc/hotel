import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useAuth } from "../../context";

const initialValues = {
  nombre: "Ivan",
  apPaterno: "Martinez",
  apMaterno: "Ramirez",
  genero: "M",
  fechaNacimiento: new Date().toJSON().slice(0,10),
  telefono: "551578751",
  telefonoContactoEmergencia:"144845135",
  nombreContactoEmergencia:"Edgar",
  apPaternoContactoEmergencia: "Ramirez",
  apMaternoContactoEmergencia:"Fuentes",
  curp: "IIIIIII",
  rfc: "IIIIIII",
  calle: "Durazno",
  numeroExterior: "12",
  numeroInterior: "3",
  colonia: "la cruz",
  estado: "CDMX",
  alcaldia: "magdalena",
  codigoPostal:"10800",
  contrasenia: "12345",
  contrasenia1: "12345",
  correo: "ivan@mail.com",
  idRol: 3,
}

export const CustomerForm = ({titulo, boton, url}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues:initialValues});
  const { signin } = useAuth();

  const onSubmit = async (formData) => {
    const { password, password1 } = formData;
    if ( password != password1 ) {
      return console.error('Las contraseñas no coinciden');
    }
    await signin(formData, url)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container py-4">
        <div className="row d-flex justify-content-center align-items-center mh-100 overflow-auto">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 w-75">
            <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">{titulo}</h3>
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                            className="form-check-input" 
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
                            className="form-check-input" 
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default"
                          required
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
                          { ...register("telefonoContactoEmergencia",{required:true})}
                        />
                      </label>
                    </div>
                  </div>

                  <label className="form-label text-start w-100">
                    Nombre(s) del contacto de emergencia
                    <input 
                      placeholder="Juan" 
                      type="text" 
                      className="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default" 
                      required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                      className="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default" 
                      required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                          className="form-control" 
                          aria-label="Sizing example input" 
                          aria-describedby="inputGroup-sizing-default" 
                          required
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
                      className="form-control" 
                      aria-label="Sizing example input" 
                      aria-describedby="inputGroup-sizing-default" 
                      required
                      { ...register("correo",{required:true})}
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
                      { ...register("contrasenia",{required:true})}
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
                      { ...register("contrasenia1",{required:true})}
                    />
                  </label>
                </div>

                <div className="d-grid gap-3">
                  <button className="btn btn-primary btn-lg btn-block" type="submit">{boton}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}