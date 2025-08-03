import { useState, useEffect } from 'react'
import { TooManyResults, CountryList, CountryDetails } from './components/countries.jsx'

const MAX_COUNTRIES = 10;
const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [allCountryNames, setAllCountryNames] = useState([])
  const [filteredNames, setFilteredNames] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingCountry, setLoadingCountry] = useState(false)


  useEffect(() => {
    const fetchAllCountryNames = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${BASE_URL}/all`)
        if (response.ok) {
          const countries = await response.json()
          // Extract just the common names
          const names = countries.map(country => country.name.common)
          setAllCountryNames(names)
          console.log(`✅ Loaded ${names.length} country names`)
        } else {
          throw new Error(`API failed: ${response.status}`)
        }
      } catch (error) {
        console.error('Failed to fetch country names:', error)
        // Fallback mock data
        const mockNames = ['Finland', 'France', 'Sweden', 'Norway', 'Denmark']
        setAllCountryNames(mockNames)
        console.log('Using mock country names')
      } finally {
        setLoading(false)
      }
    }

    fetchAllCountryNames()
  }, [])

  // Filter names and handle single country fetch
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredNames([])
      setSelectedCountry(null)
      return
    }

    // Filter country names
    const filtered = allCountryNames.filter(name =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    setFilteredNames(filtered)

    // If exactly 1 result, fetch full country data immediately
    if (filtered.length === 1) {
      setLoadingCountry(true)
      fetchSingleCountry(filtered[0])
        .then(countryData => {
          setSelectedCountry(countryData)
        })
        .catch(error => {
          setSelectedCountry(null)
        })
        .finally(() => {
          setLoadingCountry(false)
        })
    } else {
      setSelectedCountry(null)
    }
  }, [searchQuery, allCountryNames])

  const fetchSingleCountry = async (countryName) => {
    try {
      const response = await fetch(`${BASE_URL}/name/${countryName}`)
      if (response.ok) {
        const countryData = await response.json()
        console.log(`Fetched details for: ${countryName}`)
        return countryData
        throw new Error(`Failed to fetch ${countryName}`)
      }
    } catch (error) {
      console.error(`Error fetching country ${countryName}:`, error)
      throw error
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }
  
  const renderResults = () => {
    if (loading) {
      return <div>Loading countries...</div>
    }

    if (!searchQuery.trim()) {
      return null
    }

    const count = filteredNames.length

    if (count > MAX_COUNTRIES) {
      return <TooManyResults />
    }

    if (count > 1) {
      return <CountryList 
        countries={filteredNames.map(name => ({ name: { common: name } }))} 
        onFetchCountry={fetchSingleCountry}
      />
    }

    if (count === 1) {
      if (loadingCountry) {
        return <div>Loading country details...</div>
      }
      return selectedCountry ? <CountryDetails country={selectedCountry} /> : <div>Loading...</div>
    }

    return <div>No countries found</div>
  }

  return (
    <div>
      <div>
        find countries{' '}
        <input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter country name "
        />
      </div>
      
      {renderResults()}
    </div>
  )
}

export default App
