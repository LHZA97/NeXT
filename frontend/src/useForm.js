import { useState } from 'react';
import moment from 'moment';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const useForm = () => {
    const [loading, setLoading] = useState('')
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [result, setResult] = useState({});
    const [timeData, setTimeData] = useState('');
    
    const getTimeStamp = (e) =>{
        e.preventDefault();
        setLoading(false);
        let inputValues = {date, time}
        const requestOption = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputValues)
        }
        fetch('getCountry', requestOption)
        .then(async res => {
            const data = await res.json();
            let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
            const code = data.map((country) => {
                return (
                <>
                  <Timeline position="left" key={country.id}>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{country.country_code === '??' ? country.country_code = 'Unknown Area' : regionNames.of(country.country_code)}</TimelineContent>
                  </TimelineItem>
                  </Timeline>
                </>
                );
            });
            setResult(code)
            setLoading(true);
        })
        .catch(error => {
          console.error('Error:', error);
        });

        fetch('getDate', requestOption)
        .then(async res =>{
            const data= await res.json();
            const getTime = data.map((item, key) =>{
                return(
                  <>
                  <Timeline position="right" key={key}>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{moment.unix(item).format('dddd, MMMM Do, YYYY h:mm:ss A')}</TimelineContent>
                  </TimelineItem>
                  </Timeline>
                  </>
                    // <Grid container>
                    // <Paper variant='outlined' square key={key}>{moment.unix(item).format('dddd, MMMM Do, YYYY h:mm:ss A')}</Paper>
                    // </Grid>
                )
            });
            setTimeData(getTime);
        })
      };

    return { getTimeStamp, loading, result, timeData, setDate, setTime, setTimeData };
};

export default useForm;