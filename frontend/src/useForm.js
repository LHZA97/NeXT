import { useState } from 'react';
import moment from 'moment';

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
            const code = data.map((item) => {
                return (
                <>
                <p key={item.id}>{item.country_code === '??' ? item.country_code = 'Unknown Area' : item.country_code}</p>
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
                    <p key={item.id}>{moment.unix(item).format('dddd, MMMM Do, YYYY h:mm:ss A')}</p>
                    </>
                )
            });
            setTimeData(getTime);
        })
      };

    return { getTimeStamp, loading, result, timeData, setDate, setTime, setTimeData };
};

export default useForm;