import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

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
        });
    } else {
      alert('Please enter location!');
    }
  };
  var speed = (data.wind?.speed * 1.609344).toFixed();

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

        {/* <button className='search-btn' type='button' onClick={searchLocation}> */}
        <i className='fas fa-search' onClick={searchLocation} />
        {/* </button> */}
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()} &deg;C</h1> : null}
          </div>
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
