

import { AppRouter } from "./router/AppRouter"

import { AdminProvider, AuthProvider, ReservacionesProvider } from './context'

const init = () => {
  return {logged: false, role: null}
}

function App() {

  return (
    <AuthProvider>
      <AdminProvider>
        <ReservacionesProvider>
          <AppRouter />
        </ReservacionesProvider>
      </AdminProvider>
    </AuthProvider>
  )
}

export default App
