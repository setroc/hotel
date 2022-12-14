

import { AppRouter } from "./router/AppRouter"

import { AuthProvider } from './context'

const init = () => {
  return {logged: false, role: null}
}

function App() {

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
