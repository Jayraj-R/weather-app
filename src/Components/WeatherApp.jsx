import { Grid, Paper, TextField,InputAdornment, Typography  } from '@material-ui/core';
import React, { useState } from 'react';
import {makeStyles} from '@material-ui/styles';
import LocationSearchingOutlinedIcon from '@material-ui/icons/LocationSearchingOutlined';
import brokenClouds from '../broken-clouds.png'
import haze from '../haze-mist-dust.png'
import rain from '../rain-thunder-shower.png'
import SentimentDissatisfiedSharpIcon from '@material-ui/icons/SentimentDissatisfiedSharp';
const useStyles = makeStyles({
    root: {
      backgroundImage: "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
      height:"100vh",
      color:"white"
    },
    paper:{
      position:"relative",
      height:"80vh",
      background:"#40e0d0",
      overflow:"hidden",
    },
    bgImage:{
      position:"absolute",
      width:"101%",
      height:"101%",
      transform:"translateX(-50%)",
      transitions:"4s ease-in"
    },
    content:{
      position:"relative",
    },
    searchBar:{
      backgroundColor:"rgba(255,255,255,0.7)",
      width:"75%",
      height:"40px",
      position:"relative",
      top:15,
      left:"50%",
      transform:"translateX(-50%)",
      borderRadius:50
    },
    themeColor:{
      color:"#00ced1"
    },
    sorry:{
      background:"rgba(240,240,240,0.4)",
      padding:"0.8em 0.8em",
      borderRadius:15,
      position:"absolute",
      top:"12rem",
      color:"white",
      left:"50%",
      transform: "translateX(-50%)",
      textShadow:"1px 1px 1px black",
    },
    sadFace:{
      fontSize:"3em",
      position:"relative",
      top:"50%",
      transform:"translateY(-30%)",
      margin:-12,
      marginRight:"0.1em"
    },
    temp:{
      color:"white",
      textShadow:"1px 1px 1px black"
    },
    weather:{
      color:"white",
      textShadow:"1px 1px 10px black"
    },
    weathers:{
      background:"rgba(245,245,245,0.3)",
      position:"relative",
      top:"4rem",
      left:"50%",
      transform: "translateX(-50%)",
      padding:"1em",
      boxShadow: "1px 1px 5px",
      borderRadius:"10px",
      width:"60%"
    },
    extraStats:{
      color:"white",
      background:"rgba(245,245,245,0.25)",
      position:"relative",
      top:"7rem",
      textShadow:"1px 1px 5px black",
      borderRadius:"10px",
      height:"8rem",
      left:"50%",
      transform: "translateX(-50%)"
    },
    loc:{
      color:"white",
      position:"relative",
      top:"6rem",
      left:"1rem",
      textShadow:"1px 1px 5px black"
    },
    flex:{
      display:"flex",
      flexDirection:"column",
      fontSize:18,
      margin:"0px 0.3rem"
    }
  });

const WeatherApp = () => {
    const classes = useStyles();

    const api = {
        key: "d5481641df1dcb6ac7c1d01fec572114",
        base: "https://api.openweathermap.org/data/2.5/"
    }
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({
      weather:undefined
    })
    const [bg, setBg] = useState('01d')
    const [bgi, setBgi] = useState(brokenClouds)

    
    const bgHandler = () =>{
      setBg(weather.weather[0].icon)
      if(bg==='02d' || bg==='03d' || bg==='01d' || bg==='02n' || bg==='03n' || bg==='01n')  setBgi(brokenClouds)
      if(bg==='50n' || bg==='50d') setBgi(haze)
      if(bg==='04d' || bg==='09d' || bg==='10d' || bg==='11d' || bg==='04n' || bg==='09n' || bg==='10n' || bg==='11n') setBgi(rain)
    }
    
    const search = evt => {
        if (evt.key === "Enter") {
          fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
              setTimeout(() => {
                setWeather(result); 
                setQuery('');
              }, 2000);
            });
        }
        
        if(typeof weather.weather != "undefined"){
          bgHandler()
          console.log(bg, bgi)
        }
      }

    

    return (
        <Grid container className={classes.root} justify="center" alignItems="center" xs={12}>
          <Grid item xs={10} sm={3}>
            <Paper className={classes.paper}>
              
              {/* BACKGROUND IMAGE */}
              <img className={classes.bgImage} src={bgi}/>
              
              {/* CONTENT */}
              <div className={classes.content}>
                <div className={classes.searchBar}>
                  <TextField
                    id="city"
                    onChange={e=> setQuery(e.target.value)} 
                    value={query} 
                    onKeyPress={search}
                    placeholder="Search..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationSearchingOutlinedIcon className={classes.themeColor}/>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                  {weather.cod==="404" 

                      ? (
                        <Grid container item xs={10} className={classes.sorry}>
                          <Grid xs={3}>
                            <SentimentDissatisfiedSharpIcon className={classes.sadFace}/>
                          </Grid>

                          <Grid xs={9}>
                            <Typography variant="p">
                              <strong>Sorry, the specified city was not found...</strong>
                            </Typography>
                          </Grid>
                        </Grid>
                      ): (
                        weather.main!==undefined &&(<div>

                          <section className={classes.weathers}>
                            <Grid className={classes.temp} container item xs={12}  justify="center" alignItems="center">
                              <Typography className={classes.temp} variant="h2"> 
                                {Math.round(weather.main.temp)}°C
                              </Typography>
                              <Typography variant="subtitle1">
                                {Math.round(weather.main.temp*1.8+32)}°F
                              </Typography>
                            </Grid>

                            <Grid className={classes.weather} container item xs={12}  justify="center" alignItems="center">
                              <Typography variant="h6">
                                {weather.weather[0].main} 
                              </Typography>
                            </Grid>

                            <Grid className={classes.icon} container item xs={12}  justify="center" alignItems="center">
                              <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}/>
                            </Grid>
                          </section>

                          <section className={classes.loc}>
                            <Grid container xs={12} className>
                            <Typography variant="h4">
                              {weather.name}, {weather.sys.country}
                            </Typography>
                              
                            </Grid>
                          </section>

                          <section>
                              <Grid container xs={11} justify="center" alignItems="center" className={classes.extraStats}>
                                <Typography variant="p">
                                  <div className={classes.flex} style={{flexDirection:"row"}}>
                                    <div className={classes.flex} >
                                      <strong>Max</strong>
                                      <span>{weather.main.temp_max}°</span>
                                    </div>
                                    <div className={classes.flex}>
                                      <strong>Min</strong>
                                      <span>{weather.main.temp_max}°</span>
                                    </div>
                                    <div className={classes.flex}>
                                      <strong>Wind</strong>
                                      <span>{weather.wind.speed}mph</span>
                                    </div>
                                    <div className={classes.flex}>
                                      <strong>Humidity</strong>
                                      <span>{weather.main.humidity}%</span>
                                    </div>
                                  </div>
                                </Typography>
                              </Grid>
                          </section>

                            {/* {weather.name} {weather.sys.country} */}
                          
                        </div>
                        )
                      )
                  }

                </div>

                
            </Paper>
          </Grid>
        </Grid>
    )
}

export default WeatherApp
