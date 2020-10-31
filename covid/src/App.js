import React, {useState, useEffect} from 'react'
import './App.css'
import { FormControl,Select, MenuItem } from '@material-ui/core';
import InfoBox from './InfoBox'

const App = () => {

 const [countries, setCountries] = useState([])
 const [country, setCountry] = useState('worldwide')
 
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

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode)
  }

  return (
    <div className="App">

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
        <InfoBox title="Corona Virus Cases" cases={12345} total={2000} />

        <InfoBox title="Recovered" cases={123} total={3000}/>

        <InfoBox title="Deaths"  cases={1235} total={4000}/>
            
      </div>
      
     

      

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  )
}

export default App;
