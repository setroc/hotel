import React from 'react'

export const Perfil = () => {
  //if(data.user=="Cliente")
  return (
    <form className="vh-100" >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center mh-100 ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 w-100">
            <div className="card">
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Perfil</h3>
                <div className="mb-2">
                  <label className="form-label text-start w-100">
                    Nombre(s)
                    <input placeholder="Juan" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                  </label>
                  <div className="row">
                    <div className="col-md">
                      <label className="form-label text-start w-100">
                        Apellido paterno
                        <input placeholder="Perez" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                      </label>
                    </div>
                    <div className="col-md">
                      <label className="form-label text-start w-100">
                        Apellido materno
                        <input placeholder="Sosa" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
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
                        <input placeholder="5546783920" type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                      </label>
                    </div>
                    <div className="col-md">
                      <label className="form-label text-start w-100">
                        Número de emergencia
                        <input placeholder="5532567290" type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                      </label>
                    </div>
                  </div>
                  
                  <label className="form-label text-start w-100">
                    Correo
                    <input placeholder="micorreo@dominio.com" type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                  </label>
                  {/*
                    Condición para definir la información a mostrar
                  {
                    data.user.rol=="Cliente"?(
                      <label className="form-label text-start w-100">
                    CURP
                    <input placeholder="XXXX999999XXXXXX11" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                  </label>
                    ):()
                  }*/}
                  <label className="form-label text-start w-100">
                    Fecha de nacimiento
                    <input type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                  </label>
                  <label className="form-label text-start w-100">
                    Contraseña
                    <input placeholder="" type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                  </label>
                </div>

                <div className="d-grid gap-3">
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Crear cuenta</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

