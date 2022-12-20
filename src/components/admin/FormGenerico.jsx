import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useFetch } from "../../hooks";

/* 
  tipo:
  0 - rol
  1 - typeroom
  2 - room
  modo:
  true - registrar
  false - actualizar
*/
export const FormGenerico = ({tipo,modo, url}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {id} = useParams();
  const { registrar, actualizar } = useFetch();

  const onSubmit = async (formData) => {
    try {
      if (modo) {
        const val = await registrar(url, formData);
        if (!val) { //error
          return Swal.fire({
            icon: 'error',
            title: `Error al registrar.`,
            text: 'Algo fue mal!',
          })
        }
        reset();
        return Swal.fire({
          icon: 'success',
          title: `Se ha registrado correctamente el dato.`,
        })
      }
      const val = await actualizar(`${url}/${id}`, formData);
      if (!val) { //error
        return Swal.fire({
          icon: 'error',
          title: `Error al actualizar.`,
          text: 'Algo fue mal!',
        })
      }
      reset();
      return Swal.fire({
        icon: 'success',
        title: `Se ha actualizado correctamente el dato.`,
      })

    } catch (error) {
      console.log(error)
    }
  }

  const getData = async (id) => {
    try {
      const resp = await fetch(`${url}/${id}`,{
        credentials: 'include'
      });
      const body = await resp.json();
      body.role_name = body.nombre;
      delete body.nombre;
      reset(body)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (modo) {
      return
    }
    getData(id);
    
  }, [modo])
  


  
  if ( tipo === 0) { // registrar/actualizar role
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body w-100 p-4 text-center">
          <h3 className="mb-5">{modo?`Registrar rol`:`Actualizar rol`}</h3>
          <div className="mb-2">
            <label className="form-label text-start w-100">
              Nombre del rol
              <input 
                placeholder="administrador" 
                type="text" 
                className={`form-control ${errors.role_name && 'is-invalid'}`}
                { ...register("role_name",{required:true})}
              />
            </label>
          </div>
          <div className="d-grid gap-3">
            <button className="btn btn-primary btn-lg btn-block" type="submit">{modo ? 'Registrar':'Actualizar'}</button>
          </div>
        </div>
      </form>
    )
  }
}