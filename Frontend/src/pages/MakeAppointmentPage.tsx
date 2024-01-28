import AppointmentForm from '../components/AppointmentForm/AppointmentForm'
import { MakeAppointmentProperties } from '../model/Properties'

const MakeAppointmentPage = (props: MakeAppointmentProperties) => {
  return (
    <div>
      <AppointmentForm onMakeAppointment={props.onMakeAppointment} />
    </div>
  )
}

export default MakeAppointmentPage
