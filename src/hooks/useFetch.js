
export const useFetch = () => {

  const registrar = async (url, formData) => {
    try {
      const resp = await fetch(url, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN':document.cookie.split('=')[1]
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      if ( resp.ok ){
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  const actualizar = async (url, formData) => {
    try {
      const resp = await fetch(url, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN':document.cookie.split('=')[1]
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      if ( resp.ok ){
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const borrar = async (url) => {
    try {
      const resp = await fetch(url,{
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-CSRF-TOKEN':document.cookie.split('=')[1]
        }
      });
      if (resp.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return {
    registrar,
    actualizar,
    borrar
  }
}