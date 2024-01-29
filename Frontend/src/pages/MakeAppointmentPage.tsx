import AppointmentForm from '../components/AppointmentForm/AppointmentForm'
import TakenAppointmentList from '../components/TakenAppointmentList/TakenAppointmentList'
import { MakeAppointmentProperties } from '../model/Properties'
import styles from './MakeAppointmentPage.module.css'

const MakeAppointmentPage = (props: MakeAppointmentProperties) => {
  return (
    <div className={styles.div_make_appoint}>
      <AppointmentForm onMakeAppointment={props.onMakeAppointment} />
      <TakenAppointmentList />
    </div>
  )
}

export default MakeAppointmentPage
