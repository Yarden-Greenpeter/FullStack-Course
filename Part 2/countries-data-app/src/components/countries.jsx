import { useState } from 'react'

const TooManyResults = () => (
    <div>
      <p>Too many matches specify another filter</p>
    </div>
  )
  
  // CountryList.jsx  
  const CountryList = ({ countries, onFetchCountry }) => {
    const [expandedCountries, setExpandedCountries] = useState({})
    const [countryDetails, setCountryDetails] = useState({})
    const [loadingCountries, setLoadingCountries] = useState({})
  
    const handleToggleCountry = async (countryName) => {
      const isExpanded = expandedCountries[countryName]
      
      if (isExpanded) {
        // Hide/collapse country
        setExpandedCountries(prev => ({
          ...prev,
          [countryName]: false
        }))
      } else {
        // Show/expand country
        setLoadingCountries(prev => ({ ...prev, [countryName]: true }))
        
        try {
          const countryData = await onFetchCountry(countryName)
          setCountryDetails(prev => ({
            ...prev,
            [countryName]: countryData
          }))
          setExpandedCountries(prev => ({
            ...prev,
            [countryName]: true
          }))
        } catch (error) {
          console.error(`Failed to fetch ${countryName}:`, error)
        } finally {
          setLoadingCountries(prev => ({ ...prev, [countryName]: false }))
        }
      }
    }
  
    return (
      <div>
        {countries.map(country => {
          const countryName = country.name.common
          const isExpanded = expandedCountries[countryName]
          const isLoading = loadingCountries[countryName]
          const details = countryDetails[countryName]
          
          return (
            <div key={countryName}>
              <div>
                {countryName}{' '}
                <button 
                  onClick={() => handleToggleCountry(countryName)}
                  disabled={isLoading}
                >
                  {isLoading ? 'loading...' : (isExpanded ? 'hide' : 'show')}
                </button>
              </div>
              
              {isExpanded && details && (
                <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                  <CountryDetails country={details} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
  
  // CountryDetails.jsx
  const CountryDetails = ({ country }) => {
    if (!country) return null
  
    return (
      <div>
        <h2>{country.name.common}</h2>
        
        <div>
          <span>Capital: {country.capital?.[0] || 'N/A'}</span>
          <br></br>
          <span>Area: {country.area}</span>
        </div>
  
        <div>
          <h4>Languages:</h4>
          <ul>
            {country.languages ? 
              Object.values(country.languages).map(lang => (
                <li key={lang}>{lang}</li>
              )) : 
              <li>No language data</li>
            }
          </ul>
        </div>
  
        {country.flags?.png && (
          <div>
            <img 
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`}
              style={{ width: '150px', border: '1px solid #ccc' }}
            />
          </div>
        )}
      </div>
    )
  }
  
  export { TooManyResults, CountryList, CountryDetails }