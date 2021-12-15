import {useState, useEffect} from 'react';
import moment from 'moment';

function App() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  let txt = '';

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
    document.getElementById("dateChoice").setAttribute("value", currentDate);
    document.getElementById("timeChoice").setAttribute("value", currentTime);
  }, [])
  
  const getTimeStamp = async() =>{
    try {
      const m = moment(date).add(time);
      var timeInput = m.unix()
      var after = [];
      var before = [];
      let k = 0; 
      let i = 0;
      let bInput = timeInput;
      let aInput = timeInput;
      while  (i < 10){
        bInput = bInput - 600;
        before.push(bInput)
        i++;
      }
      console.log(timeInput)
      while  (k < 10){ 
        aInput = aInput + 600;
        after.push(aInput)
        k++;
      }

      before.forEach(fetchData);
      console.log(before);
      after.forEach(fetchData);
      console.log(after);
    } catch (error) {
      console.log(error)
    }
  }


  const fetchData = async(value) =>{
    try {
      //var result = [];
      var urlTimestamp = 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=' + value + '&units=miles'
      const response = await fetch(urlTimestamp, {value})
      const data = await response.json();
      let resultTime = moment.unix(data[0].timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A');
      setLongitude(data[0].longitude);
      setLatitude(data[0].latitude);
      var urlCoordinate = 'https://api.wheretheiss.at/v1/coordinates/' + latitude +',' + longitude;
      const location = await fetch(urlCoordinate, {longitude, latitude});
      const countryCode = await location.json();
      const cCode = countryCode.country_code;
      if(cCode === '??' ? txt += resultTime + ': Unknown Area <br>' : txt += resultTime + ': '+ cCode + '<br>');
      console.log(countryCode);
      //result.push(cCode);
      document.getElementById("demo").innerHTML = txt; 
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <p>Choose your date and time to see the coordinate of ISS!</p>
      <input type='date' id='dateChoice' onChange={(e)=>setDate(e.target.value)}/>
      <input type='time' id='timeChoice' onChange={(e)=>setTime(e.target.value)}/>
      <button text='Click' onClick={getTimeStamp}>Click</button>
      <p id='demo'></p>

    </div>
  );
}

export default App;
