import { Fragment } from 'react'
import './App.css'
import CarList from './components/carlist'
import { AppBar, Typography } from '@mui/material'

function App() {

  return (

    <Fragment>
      <AppBar>
        <Typography variant='h6' >
          Carapp
        </Typography>
      </AppBar>
      <CarList />
    </Fragment >
  )
}
export default App
