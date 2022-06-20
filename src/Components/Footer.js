import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Colors from '../constants/Colors'
import Images from '../constants/Images'

export default function Footer() {
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
    }}>

      <div style={{ height: '5vh', color:'#fff' , display:'flex' , justifyContent:'center' , alignItems:'center', backgroundColor: Colors.MAIN_COLOR, width: '100%' }}>
        <Typography variant='subtitle1' fontWeight='bold' > Developed By Ganesh </Typography>
      </div>

    </div>
  )
}
