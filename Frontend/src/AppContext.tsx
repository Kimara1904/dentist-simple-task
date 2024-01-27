import { useState } from 'react'

import {
  Alert,
  AlertTitle,
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Toolbar,
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

import { isIdentified } from './helper/TokenHelper'
import AppRouter from './routing/AppRouter'
import IdentifyForm from './components/IdentifyForm/IdentifyForm'
import styles from './AppContext.module.css'

const AppContext = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isIdentifyShown, setIsIdentifyShown] = useState(false)
  const [isSuccessIdentify, setIsSuccessIdentify] = useState(false)

  const navigation = useNavigate()

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleClickIcon = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNewAppointClick = () => {
    navigation('/new-appoint')
    handleCloseMenu()
  }

  const handleViewAppointClick = () => {
    navigation('/appoint-view')
    handleCloseMenu()
  }

  const handleLogoutClick = () => {
    sessionStorage.clear()
    handleCloseMenu()
  }

  const handleIdentifyClick = () => {
    setIsIdentifyShown(true)
    handleCloseMenu()
  }

  const handleIdentifyModalClose = () => {
    setIsIdentifyShown(false)
  }

  const handleSuccessIdentify = () => {
    setIsSuccessIdentify(true)
  }

  return (
    <>
      <AppBar position='fixed' style={{ backgroundColor: 'darkgreen' }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Dentist
          </Typography>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleClickIcon}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id='MenuAppBar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleNewAppointClick}>
              <Typography textAlign='center'>Make Appointment</Typography>
            </MenuItem>
            <MenuItem onClick={handleViewAppointClick}>
              <Typography textAlign='center'>View Appointments</Typography>
            </MenuItem>
            {isIdentified() ? (
              <MenuItem onClick={handleLogoutClick}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleIdentifyClick}>
                <Typography textAlign='center'>Identify</Typography>
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      {isSuccessIdentify && (
        <Alert onClose={() => setIsSuccessIdentify(false)}>
          <AlertTitle>Success</AlertTitle>
          Successfully identified
        </Alert>
      )}
      <AppRouter />
      <Modal
        open={isIdentifyShown}
        onClose={handleIdentifyModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className={styles.Identify_form}>
          <IdentifyForm onIdentify={handleIdentifyModalClose} onSuccess={handleSuccessIdentify} />
        </div>
      </Modal>
    </>
  )
}

export default AppContext
