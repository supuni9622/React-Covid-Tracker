import React from 'react'
import numeral from 'numeral'
import {Circle, Popup} from 'react-leaflet';

// Careate colors dictionary
const casesTypeColors = {
    cases: {
        hex: '#cc1034',
        // rgb: 'rgb(204, 16, 52',
        // half_op: 'rgba(125,16,52,0.5)',
        multiplier: 800
    },
    recovered: {
        hex: '#7dd71d',
        // rgb: 'rgb(125,215,29)',
        // half_op: 'rgba(125, 215, 29, 0.5)',
        multiplier: 1200
    },
    deaths: {
        hex: '#fb4443',
        // rgb: 'rgb(251, 68, 67)',
        // half_op: 'rgba(251, 68, 67, 0.5)',
        multiplier: 2000
    }
}

export const sortData = (data) => {
    const sortedData = [...data]

    // Longer way
    // sortedData.sort((a,b) => {
    //     if(a.cases > b.cases){
    //         // -1 similar to false
    //         return -1;
    //     }else{
    //         // similar to true
    //         return 1
    //     }
    // })
    // return sortedData;

    // Shortest way 
     return sortedData.sort((a,b) => a.cases > b.cases ? -1 : 1);
}

// Draw circles on the the map with interactive tooltip
 export const showDataOnMap = (data, casesType ='cases') => (
        data.map(country => (
            <Circle
                center= {[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color = {casesTypeColors[casesType].hex}
                fillColor = {casesTypeColors[casesType].hex}
                radius = {
                    Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
                }
            >
                <Popup>
                    <div className="info-container">
                        <div
                            className="info-flag"
                            style={{backgroundImage:`url(${country.countryInfo.flag})`}}
                        />
                        <div className="info-name">
                            {country.country}
                        </div>
                        <div className="info-confirmed">
                             Cases : {numeral(country.cases).format("0,0")}
                        </div>
                        <div className="info-recovered"> 
                            Recovered : {numeral(country.recovered).format("0,0")}
                         </div>
                        <div className="info-deaths">
                             Deaths : {numeral(country.deaths).format("0,0")}
                        </div>
                    </div>
                </Popup>
            </Circle>
            
        ))
    )

