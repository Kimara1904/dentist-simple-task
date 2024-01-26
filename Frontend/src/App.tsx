import './App.css'
import AppContext from './AppContext'
import { configureAxiosRequestInterceptors } from './services/ServiceConfig'

function App() {
  configureAxiosRequestInterceptors()

  return (
    <>
      <AppContext />
    </>
  )
}

export default App
