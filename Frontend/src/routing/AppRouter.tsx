import { Navigate, Route, Routes } from 'react-router-dom'

import { isDentist } from '../helper/TokenHelper'
import ViewAppointmentsPage from '../pages/ViewAppointmentsPage'
import MakeAppointmentPage from '../pages/MakeAppointmentPage'
import { AppRouterProperties } from '../model/Properties'

const AppRouter = (props: AppRouterProperties) => {
  return (
    <Routes>
      <Route
        path='/'
        element={isDentist() ? <Navigate to='/appoint-view' /> : <Navigate to='/new-appoint' />}
      />
      <Route path='/appoint-view' element={<ViewAppointmentsPage />} />
      <Route
        path='/new-appoint'
        element={<MakeAppointmentPage onMakeAppointment={props.onMakeAppointment} />}
      />
    </Routes>
  )
}

export default AppRouter
