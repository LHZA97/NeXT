import { useEffect} from 'react';
import useForm from './useForm';
import { Typography, Button, Grid, Input } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyle = makeStyles((theme)=>({
  All:{
    backgroundColor: '#AECEFF',
    width: '100%',
    height: '100%'
  },
  App:{
    backgroundColor: '#8ea4ff',
    padding: theme.spacing(8, 0, 6),
    display: 'flex'
  },
  Title:{
    padding: '20px',
    backgroundColor: '#ffa2c2',
    margin: '10px',
    width: '120%',
    textAlign: 'center',
    stroke: 'black',
    strokeWidth: '10px',
    fontWeight: 900
  },
  Fill:{
    backgroundColor: '#efecf4'
  },
  button:{
    backgroundColor: '#ffa2c2'
  }
}))

function App() {
  const { getTimeStamp, loading, result, timeData, setDate, setTime } = useForm();
  const classes = useStyle();
  let txt;

  useEffect(()=>{
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getUTCFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if(month<10){month = '0' + month}
    if(day<10){day = '0' + day}
    var currentDate = year + "-" + month + "-" + day;
    var currentTime = hour + ":" + minutes
    document.getElementById("dateChoice").setAttribute("max", currentDate);
    document.getElementById("dateChoice").setAttribute("value", '');
    document.getElementById("timeChoice").setAttribute("value", currentTime);
  }, [])
  
 
  return (
    <div className={classes.All}>
    <div className={classes.App}>
      <div className={classes.Title}>
      <Typography variant='h4' align= 'center' >CHOOSE YOUR PAST DATE AND TIME TO TRACK ISS LOCATION!</Typography>
      </div>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item>
          <Input className={classes.Fill} type='date' id='dateChoice' onChange={(e)=>setDate(e.target.value)}/>
        </Grid>
        <Grid item>
          <Input className={classes.Fill} type='time' id='timeChoice' onChange={(e)=>setTime(e.target.value)}/>
        </Grid>
        <Grid item>
          <Button className={classes.button} variant='contained' text='Click' onClick={getTimeStamp}>Click</Button> 
        </Grid>
      </Grid>
    </div>
      <Grid container spacing={3} justifyContent='center' align= 'center'>
        <Grid item xs={3}>
          {loading ? timeData : txt='waiting...'}
        </Grid>
        <Grid item xs={3}>
          {loading ? result : txt='waiting...'}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
