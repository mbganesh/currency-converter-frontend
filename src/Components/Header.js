import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Colors from '../constants/Colors'
import Images from '../constants/Images'
import Fonts from '../constants/Fonts'

export default function Header() {
  return (
    <div style={{
      position:'fixed',
      left:0,
      top:0,
      width:'100%',
      
    }}>
      <AppBar position='static' sx={{ height: '5vh', }}>
      <Toolbar sx={{ height: '5vh', backgroundColor: Colors.MAIN_COLOR, }}>
          <img src={Images.APPLOGO} alt='App Logo' style={{width:'60px' , height:'60px'}} />
          <Typography variant='h5' fontWeight='bold' fontFamily={Fonts.OPEN_SANS}> Currency Converter </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
