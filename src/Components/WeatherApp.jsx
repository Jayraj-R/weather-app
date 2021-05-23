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
    height:"100vh",
    width:"100vw",
    color:"white"
  },
  paper:{
    position:"relative",
    height:"600px",
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
  searchBar:{
    backgroundColor:"rgba(255,255,255,0.7)",
    width:"80%",
    height:"2.5rem",
    position:"relative",
    left:"50%",
    transform:"translateX(-50%)",
    borderRadius:50,
    marginTop:"5%"
  },
  themeColor:{
    color:"#00ced1",
  },
  sorry:{
    background:"rgba(240,240,240,0.4)",
    padding:"0.8rem 0.8rem",
    borderRadius:15,
    position:"absolute",
    top:"12rem",
    color:"white",
    left:"50%",
    transform: "translateX(-50%)",
    textShadow:"1px 1px 1px black",
    boxShadow: "1px 1px 1px 1px 1px black",
  },
  sadFace:{
    fontSize:"3em"
  },
  textShadow:{
    color:"white",
    textShadow:"0.9px 0.1px 1px black"
  },
  main:{
    background:"rgba(240,240,240,0.25)",
    margin:"4rem 0rem",
    padding:"2rem 0rem",
    width:"65%",
    position:"relative",
    left:"50%",
    transform: "translateX(-50%)",
    borderRadius:"10px",
  },
  country:{
    margin:"-1.8em 0em 1.2em 1.5em"
  },
  extraStats:{
    background:"rgba(240,240,240,0.1)",
    position:"relative",
    left:"50%",
    transform: "translateX(-50%)",
    width:"85%",
    padding:"1em 0.7em",
    borderRadius:"10px",
  },
  flex:{
    display:"flex",
    flexDirection:"column",
    fontSize:18,
    margin:"0px 0.3rem",
    flexWrap:"wrap",
    justifyContent:"space-around"
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
  const [bgImage, setBgImage] = useState(brokenClouds)
  
  
  const search = evt => {
      if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setTimeout(() => {
              setWeather(result); 
              setQuery('');
              
              if(result.weather && result.weather[0]){
                const bg=result.weather[0].icon
                if(bg==='02d' || bg==='03d' || bg==='01d' || bg==='02n' || bg==='03n' || bg==='01n')  setBgImage(brokenClouds)
                if(bg==='50n' || bg==='50d') setBgImage(haze)
                if(bg==='04d' || bg==='09d' || bg==='10d' || bg==='11d' || bg==='04n' || bg==='09n' || bg==='10n' || bg==='11n') setBgImage(rain)
              }
            }, 1500);
          });
        
          
        }
      
    }

  

  return (
      <Grid container className={classes.root} justify="center" alignItems="center" xs={12}>
        <Grid item xs={11} sm={3}>
          <Paper className={classes.paper}>
            
            {/* BACKGROUND IMAGE */}
            <img alt="background" className={classes.bgImage} src={bgImage}/>
            
            {/* CONTENT */}
            <div>
              <section className={classes.searchBar}>
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
              </section>

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
                      weather.main!==undefined &&(<div style={{ position:"relative"}}>

                        <Paper className={`${classes.main} ${classes.textShadow}`}>
                          <Grid container item xs={12}  justify="center" alignItems="center">
                            <Typography variant="h2"> 
                              {Math.round(weather.main.temp)}°C
                            </Typography>
                            <Typography  className={classes.themeColor}  variant="subtitle1">
                              {Math.round(weather.main.temp*1.8+32)}°F
                            </Typography>
                          </Grid>

                          <Grid container item xs={12}  justify="center" alignItems="center">
                            <Typography variant="h5">
                              {weather.weather[0].main} 
                            </Typography>
                          </Grid>

                          <Grid container item xs={12}  justify="center" alignItems="center">
                            <img alt={weather.weather[0].main} src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}/>
                          </Grid>
                        </Paper>

                        <section>
                          <Grid container xs={12} className={`${classes.textShadow} ${classes.country} `}>
                          <Typography variant="h4">
                            {weather.name}, {weather.sys.country}
                          </Typography> 
                          </Grid>
                        </section>

                        
                        <Grid container xs={11} justify="center" alignItems="center">
                          <Paper  className={`${classes.textShadow} ${classes.extraStats}`}>
                            <Typography variant="p">
                              <div className={classes.flex} style={{flexDirection:"row"}}>
                                <div className={classes.flex} >
                                  <span className={classes.themeColor}>Maximum</span>
                                  <span>{weather.main.temp_max}°</span>
                                </div>
                                <div className={classes.flex}>
                                  <span className={classes.themeColor}>Minimum</span>
                                  <span>{weather.main.temp_max}°</span>
                                </div>
                                <div style={{display:"block", width:"100%",height:"1em",}}></div>
                                <div className={classes.flex}>
                                  <span className={classes.themeColor}>Wind</span>
                                  <span>{weather.wind.speed}mph</span>
                                </div>
                                <div className={classes.flex}>
                                  <span className={classes.themeColor}>Humidity</span>
                                  <span>{weather.main.humidity}%</span>
                                </div>
                              </div>
                            </Typography>
                          </Paper>
                        </Grid>                        
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