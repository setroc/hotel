import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const authContext =  createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if ( !context ) throw new Error("No es un Authprovider");
  return context;
}

const intialState = {
  user_role: null,
  user_id: null,
  user_name: null
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(()=>{
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return intialState;
  })

  const navigate = useNavigate();

  const login = async (formData, url) => {
    const response = await fetch(url, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    const {msg, ...rest} = await response.json();
    if (response.ok) {
      localStorage.setItem('user',JSON.stringify(rest));
      setUser(rest);
      navigate('/');
      return;
    }
    Swal.fire({
      icon: 'error',
      title: 'Correo o contraseña incorrectas'
    })
    return;
  }

  const signin = async (formData, url) => {
    const response = await fetch(url,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      navigate('/login');
    }
  }

  const signout = async () => {
    await fetch(`${import.meta.env.VITE_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN':document.cookie.split('=')[1],
      },
      credentials: 'include',
    })
    localStorage.removeItem('user');
    setUser(intialState);
  }

  return (
    <authContext.Provider
      value={{
        user,
        login,
        signin,
        signout,
      }}
    >
      {children}
    </authContext.Provider>
  )
}