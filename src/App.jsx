import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'


function App() {
  const [usuario, setUsuario] = useState(null)
  return <>
    {usuario ? <Home /> : <Login />}
  </>;
}

export default App
