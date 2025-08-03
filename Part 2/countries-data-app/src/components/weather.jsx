import { useState, useEffect } from 'react'

const WeatherDetails = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!capital) {
      setError(true)
      return
    }

    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
        )
        
        if (response.ok) {
          const weatherData = await response.json()
          setWeather(weatherData)
          setError(false)
        } else {
          setError(true)
        }
      } catch (error) {
        console.error('Weather fetch failed:', error)
        setError(true)
      }
    }

    fetchWeather()
  }, [capital])

  if (error) {
    return (
      <div>
        <h4>Weather in {capital || 'Unknown'}</h4>
        <div>Problem loading weather data</div>
      </div>
    )
  }

  if (!weather) {
    return null // No loading indicator as requested
  }

  return (
    <div>
      <h4>Weather in {capital}</h4>
      <div>Temperature: {Math.round(weather.main.temp)}°C</div>
      <div>Wind: {weather.wind.speed} m/s</div>
      {weather.weather[0]?.icon && (
        <img 
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0]?.description || 'Weather icon'}
          style={{ width: '50px', height: '50px' }}
        />
      )}
    </div>
  )
}

export { WeatherDetails }