import { BrowserRouter } from 'react-router-dom'

import './App.css'
import AppContext from './AppContext'
import { configureAxiosRequestInterceptors } from './services/ServiceConfig'

function App() {
  configureAxiosRequestInterceptors()

  return (
    <BrowserRouter>
      <AppContext />
    </BrowserRouter>
  )
}

export default App
