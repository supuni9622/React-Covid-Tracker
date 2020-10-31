import React, {useState, useEffect} from 'react'
import './App.css'
import { FormControl,Select, MenuItem, Card, CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData, prettyPrintStat} from './util';
import LineGraph from './LineGraph';

const App = () => {

 const [countries, setCountries] = useState([])
 const [country, setCountry] = useState('worldwide')
 const [countryInfo, setCountryInfo] = useState({})
 const [tableData, setTableData] = useState([])
 const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796})
 const [mapZoom, setMapZoom] = useState(3)
 const [mapCountries, setMapCountries] = useState([])
 const [casesType, setCasesType] = useState('cases')


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

          // Sorted data
          const sortedData = sortData(data)
          setTableData(sortedData)
          setMapCountries(data)
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

        // Map properties 
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
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
            isOrange
            active={casesType === 'cases'}
            onClick={(e) => setCasesType('cases')}
            title="Today Corona Virus Cases" 
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)} 
          />

          <InfoBox 
            isGreen
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType('recovered')}
            title="Today Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)}
          />

          <InfoBox
            isRed
            active={casesType === 'deaths'} 
            onClick={(e) => setCasesType('deaths')}
            title="Today Deaths"  
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)}
          />     
        </div> 

        {/* Map */}
        <Map 
          casesType ={casesType}
          center={mapCenter}
          zoom = {mapZoom}
          countries = {mapCountries}
        />   
      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3 style={{marginBottom:'10px'}}>Live Cases by Country</h3>
           {/* Table */}
           <Table countries={tableData} />
           <h3 style={{marginBottom:'20px'}}> Worldwide new {casesType} </h3>
           {/* Graph */}
           <LineGraph className='app__graph' casesType={casesType}/>
        </CardContent>
      </Card>     
    </div>
  )
}

export default App;
