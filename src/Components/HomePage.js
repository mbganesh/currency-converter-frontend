import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Colors from "../constants/Colors";
import randomColor from "randomcolor";
import {
  Box,
  Button,
  Card,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Images from "../constants/Images";
import Fonts from "../constants/Fonts";

import useStateRef from 'react-usestateref'
import BtnIcon from '@mui/icons-material/CurrencyExchange';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import axios from "axios";
import APIClient from "../constants/APIClient";
import { styled } from "@mui/system";

// important
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const RootDiv = styled("div")(({ theme }) => ({
  backgroundColor: "",
  margin: "10vh 0",
  // height: "100vh",
  display: "flex",
  flexDirection: "column",
  width: "70vw",
  [theme.breakpoints.down("md")]: {
    width: "85vw",
  },
  [theme.breakpoints.down("sm")]: {
    width: "95vw",
  },
}));


export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();

  const handleAmount = (num) => {
    setAmount(num);
  };


  const handleConvert = () => {
    setLoading(true);
    console.log(APIClient.API_DEVELOPMENT + APIClient.END_POINT_CONVERT);
    console.log({ amount });
    //  axios.post(APIClient.CONVERT_API_TEST, { amount }).then(res => {
    axios
      .post(APIClient.API_DEVELOPMENT + APIClient.END_POINT_CONVERT, { amount })
      .then((res) => {
        let result = res.data.result;
        console.log(result);
        setResult(result);
        setLoading(false);
      });
  };

  
  const [rates, setRates , ratesRef] = useStateRef({})

  var myData = [];

  var myLables = [];

  var bgColors = [];

  const [chartData, setChartData] = useState({
    labels: myLables,
    datasets: [
      {
        label: "USD to INR",
        data: myData,
        backgroundColor: bgColors,
      },
    ],
  });

  
  const getData = async () => {
   
    const response = await  axios.get(APIClient.API_DEVELOPMENT + APIClient.END_POINT_GET_ONE_MONTH_DATA)

    const data = await response.data.rates;

    setRates(data)

    Object.keys(ratesRef.current).map((val) => {
      myLables.push(val);
      myData.push(ratesRef.current[val]["INR"]);
      bgColors.push(
        randomColor({ luminosity: "light", format: "rgb", hue: 'random' })
      );
  })

  console.log(myLables);
  console.log(myData);
  console.log(bgColors);
   
  };

  useEffect(  () => {
    
    getData()
      
  },[])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: Colors.LIGHT_COLOR,
      }}
    >
      <Header />
      <RootDiv>
        {/* CurrencyConverter */}
        <Card
          sx={{
            padding: "10px",
            borderRadius: "29px",
            padding:'60px',
            background: `linear-gradient(145deg, #ffffff, #e6e6e6)`,
            boxShadow: `8px 8px 16px #c7c7c7, -8px -8px 16px #ffffff`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
            }}
          >
            <img
              style={{
                width: 50,
                height: 50,
                padding: 10,
                borderRadius: "50%",
                background: "#e0e0e0",
                boxShadow: `9px 9px 13px #a8a8a8, -9px -9px 13px #ffffff`,
              }}
              src={Images.DOLLARLOGO}
              alt="dollar"
            />
            <Stack
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              padding={2}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                fontFamily={Fonts.SOURCE_SANS}
              >
                Currency Converter{" "}
              </Typography>
              <Typography variant="h6"  fontFamily={Fonts.OPEN_SANS} > USD to INR Converter</Typography>
            </Stack>
            <img
              src={Images.RUPEELOGO}
              style={{
                width: 50,
                height: 50,
                padding: 10,
                borderRadius: "50%",
                background: "#e0e0e0",
                boxShadow: `9px 9px 13px #a8a8a8, -9px -9px 13px #ffffff`,
              }}
              alt="rupee"
            />
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              padding: "20px",
            }}
          >
            <div style={{ width: "300px" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Amount
              </Typography>
              <TextField
                value={amount}
                placeholder="1.00"
                type="number"
                onChange={(e) => handleAmount(e.target.value)}
                size="small"
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                sx={{
                  "& input[type=number]": {
                    "-moz-appearance": "textfield",
                  },
                  "& input[type=number]::-webkit-outer-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
                  "& input[type=number]::-webkit-inner-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
                }}
              />
            </div>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                alignItems: "center",
                width: "60%",
              }}
            >
              <div style={{ width: "250px", padding: 2 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  {" "}
                  From{" "}
                </Typography>
                <Typography
                  sx={{
                    padding: 1,
                    // backgroundColor: Colors.DARK_COLOR,
                    borderRadius: "10px",
                    fontWeight: "bold",
                    color: "#fff",
                    borderRadius: '19px',
                     background: '#1aa3ff',
                  }}
                >
                  {" "}
                  USD{" "}
                </Typography>
              </div>

              {/* <div style={{ padding:2 ,}}>
                    <IconButton>
                    <SwitchIcon/>
                    </IconButton>
                    </div> */}

              <div style={{ width: "250px", padding: 2 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  {" "}
                  To{" "}
                </Typography>
                <Typography
                  sx={{
                    padding: 1,
                    // backgroundColor: Colors.MAIN_COLOR,
                    borderRadius: "10px",
                    fontWeight: "bold",
                    color: "#fff",
                    borderRadius: '19px',
                     background: '#1aa3ff',
                  }}
                >
                  {" "}
                  INR{" "}
                </Typography>
              </div>
            </Box>
          </Box>

          <Box
            sx={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <div>
              <Typography variant="subtitle1" fontSize={20}  fontFamily={Fonts.SOURCE_SANS}>
                {amount || 1} US Dollars =
              </Typography>
              <Typography variant="body1" fontSize={30} fontFamily={Fonts.OPEN_SANS} fontWeight="bold">
                {result} Indian Rupees
              </Typography>
            </div>
            <Button
            sx={{backgroundColor:Colors.MAIN_COLOR , '&:hover':{backgroundColor:Colors.MAIN_COLOR}}}
          color="primary"
          onClick={() => handleConvert()}
          startIcon={<BtnIcon />}
          variant="contained"
        >
          Convert
        </Button>
          </Box>
        </Card>

        {/* OneMonthReport */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "50px 0",
          }}
        >
          <Typography variant="h4" fontWeight="bold"  fontFamily={Fonts.OPEN_SANS} margin={2}>
            {" "}
            Last One Month Report{" "}
          </Typography>
          <Bar
            options={{
              scales: {
                y: {
                    min: 70,
                    max: 90,
                }
            },
              plugins: {
                title: {
                  display: true,
                  text: "Currency Converter",
                  fontSize: "25px",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
            data={chartData}
          />

        </Box>
      </RootDiv>

      <Footer />
    </div>
  );
}


/**
 *  <Bar
            options={{
              scales: {
                y: {
                    min: 75,
                    max: 80,
                }
            },
              plugins: {
                title: {
                  display: true,
                  text: "Currency Converter",
                  fontSize: "25px",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
            data={chartData}
          />
 */