

import { AppRouter } from "./router/AppRouter"

import { AdminProvider, AuthProvider } from './context'

const init = () => {
  return {logged: false, role: null}
}

function App() {

  return (
    <AuthProvider>
      <AdminProvider>
        <AppRouter />
      </AdminProvider>
    </AuthProvider>
  )
}

export default App
