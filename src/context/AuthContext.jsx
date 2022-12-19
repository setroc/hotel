import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const authContext =  createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if ( !context ) throw new Error("No es un Authprovider");
  return context;
}

const intialState = {
  user_role: null,
  user_id: null,
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
    }
  }

  const signin = async (formData, url) => {
    const response = await fetch(url,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    console.log(await response.json())
    if (response.ok) {
      navigate('/login');
    }
  }

  return (
    <authContext.Provider
      value={{
        user,
        login,
        signin,
      }}
    >
      {children}
    </authContext.Provider>
  )
}