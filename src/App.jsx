import React from 'react'

const api = {
  key: 'aaa',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const App = () => {

  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        console.log(result);
        setQuery(''); // Clear the input field after search
        // Here you can update the state with the fetched data
      }).catch(err => {
        console.error("Error fetching weather data:", err);
      });
  };
  
  return (
    <div className='text-white p-4 w-full h-screen flex flex-col items-center justify-center' id='app'>
        {/* Header */}
      <header class="bg-black/60 backdrop-blur-md border border-black/70 rounded-2xl shadow-xl p-8 w-[350px] text-white text-center space-y-6">
        <h1 className='text-2xl font-bold p-10' >Weather App ☀️</h1>

        {/* Search Bar */}

        <div className='flex p-5 items-center justify-center'>
          <input type="text"  placeholder='Enter location...' onChange={(e) => setQuery(e.target.value)} 
          class="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={query}/>
          <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold" onClick={searchPressed}>Search</button>
        </div>

        {/* Location Display */}

        <p className='pt-20'>{!weather.name ? 'Unknown Location' : `${weather.name}, ${weather.sys?.country}`}</p>

        {/* Temperature Display */}

        <p>Temperature: <span className='font-bold'>{!weather.main?.temp ? 'N/A' : `${weather.main?.temp}°C`}</span></p>

        {/* Weather Description */}
        <p className='pb-9'>{!weather.weather?.[0]?.description ? 'N/A' : weather.weather?.[0]?.description}</p>

        {/* Cords Display */}

        <p className='underline'><span className='font-bold'>{weather.sys?.country === "TN" ? 'Bara the noob lives here' : ""}</span></p>

      </header>
    </div>
  )
}

export default App
