import React from 'react'
import './App.css'
import { FormControl,Select, MenuItem } from '@material-ui/core';

const App = () => {
  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">

          {/* Loopthrough all of the countries and show all the countries */}
          <Select variant ="outlined" value="abc">
            <MenuItem value='worldwide'> Worlwide </MenuItem>
            <MenuItem value='worldwide'> Option Two </MenuItem>
            <MenuItem value='worldwide'> Option Three </MenuItem>
            <MenuItem value='worldwide'> Option Four </MenuItem>
          </Select>
        </FormControl>
      </div>
     
      
      {/* Title + Select input dropdown field */}

      {/* InforBoxes */}
      {/* InforBoxes */}
      {/* InforBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  )
}

export default App;
