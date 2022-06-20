import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Colors from '../constants/Colors'
import { Box, Button, Card, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import Images from '../constants/Images'
import Fonts from '../constants/Fonts'

import SwitchIcon from '@mui/icons-material/CompareArrows';
import axios from 'axios'
import APIClient from '../constants/APIClient'

export default function HomePage() {

    const [isUSD, setISUSD] = useState(true)

    const [amount, setAmount] = useState()
    const [result, setResult] = useState()

    const handleAmount = (num) => {
        setAmount(num)
    }

    const handleConvert = () => {
        //  axios.post(APIClient.CONVERT_API_TEST, { amount }).then(res => {
        axios.post(APIClient.CONVERT_API_TEST, { amount }).then(res => {  
            let result = res.data.result
            console.log(result);
            setResult(result)
        })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: Colors.LIGHT_COLOR, height: '100vh' }}>
            <Header />
            <div style={{ backgroundColor: '', margin: '10vh 0', height: '100vh', display: 'flex', flexDirection: 'column', width: '70vw', }}>


                {/* CurrencyConverter */}
                <Card sx={{ padding: '10px' }} >
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                        <img src={Images.DOLLARLOGO} style={{ width: 50, height: 50, padding: 10 }} alt='dollar' />
                        <Stack display='flex' flexDirection='column' alignItems='center' justifyContent='center' padding={2}>
                            <Typography variant='h5' fontWeight='bold' fontFamily={Fonts.SOURCE_SANS}> Currency Converter </Typography>
                            <Typography variant='h6'> USD to INR - Convert US Dollars to Indian Rupees </Typography>
                        </Stack>
                        <img src={Images.RUPEELOGO} style={{ width: 50, height: 50, padding: 10 }} alt='rupee' />
                    </div>


                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        padding: '20px'
                    }}>
                        <div style={{ width: '300px', }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Amount</Typography>
                            <TextField value={amount} placeholder="1.00" type='number' onChange={(e) => handleAmount(e.target.value)}
                                size='small'
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                sx={{
                                    '& input[type=number]': {
                                        '-moz-appearance': 'textfield'
                                    },
                                    '& input[type=number]::-webkit-outer-spin-button': {
                                        '-webkit-appearance': 'none',
                                        margin: 0
                                    },
                                    '& input[type=number]::-webkit-inner-spin-button': {
                                        '-webkit-appearance': 'none',
                                        margin: 0
                                    },
                                }}
                            />
                        </div>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            // backgroundColor:'red',
                            alignItems: 'center',
                            width: '60%'
                        }}>
                            <div style={{ width: '250px', padding: 2, }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }} > From </Typography>
                                <Typography sx={{ padding: 1, backgroundColor: Colors.DARK_COLOR, borderRadius: '10px', fontWeight: 'bold', color: '#fff', border: '2px solid black' }}> USD </Typography>
                            </div>

                            {/* <div style={{ padding:2 ,}}>
                    <IconButton>
                    <SwitchIcon/>
                    </IconButton>
                    </div> */}

                            <div style={{ width: '250px', padding: 2, }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }} > To </Typography>
                                <Typography sx={{ padding: 1, backgroundColor: Colors.DARK_COLOR, borderRadius: '10px', fontWeight: 'bold', color: '#fff', border: '2px solid black' }}> INR </Typography>
                            </div>


                        </Box>

                    </Box>


                    <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                        <div>
                            <Typography variant='subtitle1' fontSize={20}>{amount || 1} US Dollars =</Typography>
                            <Typography variant='body1' fontSize={30} fontWeight='bold'>{result || 5} Indian Rupees</Typography>
                        </div>
                        <Button variant='contained' onClick={() => handleConvert()}> Convert </Button>
                    </Box>

                </Card>


                {/* OneMonthReport */}
                <Box>

                </Box>

            </div>

            <Footer />
        </div>
    )
}
