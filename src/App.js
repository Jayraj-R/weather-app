import WeatherApp from './Components/WeatherApp';
import './App.css';
import { Grid,Typography } from '@material-ui/core';

function App() {
  return (
    <div className="App">
        <Grid containerjustify="center" alignItems="center" xs={12}>
          <WeatherApp/>
        </Grid>
        <Grid container className="source" justify="center" alignItems="center" xs={12}>
          <Typography variant="subtitle1">
            View <a className="links" href="https://github.com/Jayraj-R/weather-app" rel="noreferrer" target="_blank">source code</a>.      
          </Typography>
        </Grid>
        
    </div>
  );
}

export default App;
