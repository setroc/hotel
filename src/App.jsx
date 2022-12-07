import { useReducer } from "react"

import { AppRouter } from "./router/AppRouter"

import { AuthContext, AuthReducer } from './auth'

const init = () => {
  return {logged: true, role: 'admin'}
}

function App() {
  const [user, dispatch] = useReducer(AuthReducer, {}, init);
  return (
    <AuthContext.Provider value={{user, dispatch}}>
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App
