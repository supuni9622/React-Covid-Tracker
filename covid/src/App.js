import React, {useState, useEffect} from 'react'
import './App.css'
import { FormControl,Select, MenuItem, Card, CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map'

const App = () => {

 const [countries, setCountries] = useState([])
 const [country, setCountry] = useState('worldwide')
 const [countryInfo, setCountryInfo] = useState({})

  // To get worlwide data
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])
 
  useEffect(()=> {
    // The code inside here will run once
    // When the component loads and not again
    // async --> send a request, wait for it, do something with it

    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then (response => response.json())
      .then ((data) => {
        const countries = data.map((country)=> (
          {
            name: country.country, // United states, United kingdom
            value: country.countryInfo.iso2 // USA, UK
          }))

          setCountries(countries)
      })
    }
    getCountriesData()
  },[])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

     await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
      })
  }

  return (
    <div className="app">
      <div className="app__left">
         {/* Header */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          {/* Title + Select input dropdown field */}
          <FormControl className="app__dropdown">
            <Select variant ="outlined" onChange={onCountryChange} value={country} >
              {/* Loopthrough all of the countries and show all the countries */}
              <MenuItem value='worldwide'> Worldwide </MenuItem>
              {
                countries.map(country => (
                <MenuItem value={country.value}> {country.name} </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'> 
          {/* InforBoxes */}
          <InfoBox 
            title="Corona Virus Cases" 
            cases={countryInfo.todayCases} 
            total={countryInfo.cases} 
          />

          <InfoBox 
            title="Recovered" 
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered}
          />

          <InfoBox 
            title="Deaths"  
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths}
          />     
        </div> 

        {/* Map */}
        <Map/>   
      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
           {/* Table */}
           <h3> Worldwide New Cases </h3>
           {/* Graph */}
        </CardContent>
      </Card>     
    </div>
  )
}

export default App;
