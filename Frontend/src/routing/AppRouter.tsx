import { Navigate, Route, Routes } from 'react-router-dom'

import { isDentist } from '../helper/TokenHelper'
import ViewAppointmentsPage from '../pages/ViewAppointmentsPage'
import MakeAppointmentPage from '../pages/MakeAppointmentPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={isDentist() ? <Navigate to='/appoint-view' /> : <Navigate to='/new-appoint' />}
      />
      <Route path='/appoint-view' element={<ViewAppointmentsPage />} />
      <Route path='/new-appoint' element={<MakeAppointmentPage />} />
    </Routes>
  )
}

export default AppRouter
