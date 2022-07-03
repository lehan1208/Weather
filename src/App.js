import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7ca54501db62d50295b9dce3ffd309c3`;

  const searchLocation = () => {
    if (location.length > 0) {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
          setLocation('');
        })
        .catch((err) => {
          console.log('Error: ', err);
          alert('No infomation ');
        });
    } else {
      alert('Please enter location!');
    }
  };
  var speed = (data.wind?.speed * 1.609344).toFixed();
  let tempMin = data.main?.temp_min.toFixed(1);
  let tempMax = data.main?.temp_max.toFixed(1);

  // Date
  var d = new Date();
  var date = d.getDate();
  var year = d.getFullYear();
  var month = d.toLocaleString('en-GB', { month: 'long' });
  var day = d.toLocaleString('en-GB', { weekday: 'long' });

  useEffect(() => {
    var x = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(x);
    };
  });

  let emoji = null;

  if (typeof data.main !== 'undefined') {
    if (data.weather[0].main === 'Clouds') {
      emoji = 'fa-cloud';
    } else if (data.weather[0].main === 'Thunderstorm') {
      emoji = 'fa-cloud-bolt';
    } else if (data.weather[0].main === 'Drizzle') {
      emoji = 'fa-cloud-drizzle';
    } else if (data.weather[0].main === 'Rain') {
      emoji = 'fa-cloud-showers-heavy';
    } else if (data.weather[0].main === 'Snow') {
      emoji = 'fa-snowflake';
    } else {
      emoji = 'fa-smog';
    }
  } else {
    // return <div>...Loading</div>;
  }

  return (
    <div className='app'>
      <div className='search'>
        <input
          className='search-input'
          type='text'
          value={location}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchLocation();
            }
          }}
          placeholder='Enter location...'
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='time'>
        {day}, {date} {month} , {year}
        <br />
        {time}
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? (
              <div className='temp-index'>
                <h1>{data.main.temp.toFixed()} &deg;C</h1>
              </div>
            ) : null}
            <div className='weather-icon'>
              <i className={` fas ${emoji} fa-4x`} />
            </div>
          </div>
          {data.main ? (
            <p className='min-max'>
              {tempMin} &deg;C | {tempMax} &deg;C
            </p>
          ) : null}
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className='bottom'>
            <div className='feels'>
              {data.main ? (
                <p className='bold'>{data.main.feels_like.toFixed()} &deg;C</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{speed} km/h</p> : null}
              <p>Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
