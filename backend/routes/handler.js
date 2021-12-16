const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
var moment = require('moment');

router.post('/getCountry', async (req, res) => {
    try {
        const date = req.body.date;
        const time = req.body.time;

        const m = moment(date).add(time);
        var timeInput = m.unix()
        var after = [];
        var before = [];
        
        let k = 0; 
        let i = 0;
        let bInput = timeInput;
        let aInput = timeInput;
        while  (i < 6){
          bInput = bInput - 600;
          before.push(bInput)
          i++;
        }
        while  (k < 6){ 
          aInput = aInput + 600;
          after.push(aInput)
          k++;
        }
        var b = before.sort((a,b) => a-b);
        let result = [...b, timeInput,...after]
        const cCode = []
        
        for(let j=0; j< result.length; j++){
            var urlTimestamp = 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=' + result[j] + '&units=miles';
            //console.log(result[j])
            const response = await fetch(urlTimestamp)
            const data = await response.json();
            //let resultTime = moment.unix(data[0]).format('dddd, MMMM Do, YYYY h:mm:ss A');
            //console.log(data)
            let longitude = data[0].longitude
            let latitude = data[0].latitude
            var urlCoordinate = 'https://api.wheretheiss.at/v1/coordinates/' + latitude +',' + longitude;
            const location = await fetch(urlCoordinate);
            const countryCode = await location.json();
            
            cCode.push(countryCode);                
        }   
        
        res.status(200).send(cCode)
        
      } catch (error) {
        console.log(error);
      }
    }
)



router.post('/getDate',(req, res) => {
    const date = req.body.date;
        const time = req.body.time;

        const m = moment(date).add(time);
        var timeInput = m.unix()
        var after = [];
        var before = [];
        
        let k = 0; 
        let i = 0;
        let bInput = timeInput;
        let aInput = timeInput;
        while  (i < 6){
          bInput = bInput - 600;
          before.push(bInput)
          i++;
        }
        while  (k < 6){ 
          aInput = aInput + 600;
          after.push(aInput)
          k++;
        }
        var b = before.sort((a,b) => a-b);
        let result = [...b, timeInput,...after]
        res.status(200).send(result)
})

module.exports = router;

