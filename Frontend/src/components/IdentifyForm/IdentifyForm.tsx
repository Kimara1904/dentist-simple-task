import { createRef, useState } from 'react'

import { Button, TextField, Typography } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'

import { IdentifyFormProperties } from '../../model/Properties'
import { Identify } from '../../services/IdentificationService'
import { ErrorData } from '../../model/ErrorModels'
import { Jwt, roleKey } from '../../model/TokenMoldels'
import styles from './IdentifyForm.module.css'

const IdentifyForm = (props: IdentifyFormProperties) => {
  const [isJmbgError, setIsJmbgError] = useState(false)
  const [jmbgErrorMessage, setJmbgErrorMessage] = useState('')
  const [isIdentifyError, setIsIdentifyError] = useState(false)
  const [identifyErrorMessage, setIdentifyErrorMessage] = useState('')

  const jmbgRef = createRef<HTMLInputElement>()

  const handleBlurJmbg = () => {
    const enteredJmbg = jmbgRef.current?.value.trim() as string

    if (enteredJmbg.length === 0) {
      setIsJmbgError(true)
      setJmbgErrorMessage('Jmbg is required')
    } else if (!/^\d+$/.test(enteredJmbg)) {
      setIsJmbgError(true)
      setJmbgErrorMessage('Jmbg must contain only numbers')
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const enteredJmbg = jmbgRef.current?.value.trim() as string
    if (enteredJmbg.length === 0) {
      setIsJmbgError(true)
      setJmbgErrorMessage('Jmbg is required')
      return
    }
    if (!/^\d+$/.test(enteredJmbg)) {
      setIsJmbgError(true)
      setJmbgErrorMessage('Jmbg must contain only numbers')
      return
    }

    Identify(enteredJmbg)
      .then((response) => {
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('role', jwtDecode<Jwt>(response.data.token)[roleKey])
        props.onIdentify()
        props.onSuccess()
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          setIsIdentifyError(true)
          setIdentifyErrorMessage(error.response?.data.Exception as string)
        }
      })
  }

  return (
    <div className={styles.div_identify_form}>
      <form className={styles.identify_form} onSubmit={handleSubmit}>
        <TextField
          id='Jmbg'
          type='text'
          label='Jmbg'
          variant='outlined'
          error={isJmbgError}
          helperText={isJmbgError && jmbgErrorMessage}
          inputRef={jmbgRef}
          onBlur={handleBlurJmbg}
          onFocus={() => {
            setIsJmbgError(false)
            setJmbgErrorMessage('')
          }}
          style={{ marginBottom: '16px' }}
          inputProps={{ maxLength: 13, minLength: 13 }}
        />

        {isIdentifyError && (
          <Typography variant='body2' color='error' style={{ marginBottom: '16px' }}>
            {identifyErrorMessage}
          </Typography>
        )}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          style={{ marginTop: '16px', width: '100px' }}
        >
          Identify
        </Button>
      </form>
    </div>
  )
}

export default IdentifyForm
