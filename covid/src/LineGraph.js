import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'

// This a config to get chart from chart.js
// Options for gridlines
const options = {
    legend: {
        display: false
    },
    elements : {
        point: {
            radius: 0
        }
    },
    maintainAspectRatio : false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales : {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll'    
                }
            }
        ],
        yAxes : [
            {
                gridLines: {
                    display: false
                },
                ticks: {
                    // Include a doller sign in the ticks
                    callback : function ( value, index, values) {
                        return numeral(value).format("0a")
                    }
                }
            }
        ]
    }
}

const LineGraph = ({casesType="cases"}) => {

    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
           await fetch('https://disease.sh/v3/covid-19/historical/all')
            .then(response => response.json())
            .then(data => {
                console.log('LineChart' + data)
                let chartData = buildChartData(data, 'cases')
                setData(chartData)
            })
        }

        fetchData()
        
    },[casesType]);

    const buildChartData = (data, casesType)=> {
        const chartData = [];
        let lastDataPoint;

       for(let date in data.cases){
            if(lastDataPoint) {
                const newDataPoint = {
                    x : date,
                    y : data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData
    }

    return (
        <div>
            {/* Following 'data?.length' is similar to data && data.length ? */}
            {data?.length > 0 && (
            <Line
                options={options}
                data={{
                    datasets: [{
                        backgroundColor: 'rgba(204, 16, 52, 0.5',
                        borderColor: '#cc1034',
                        data: data
                    }],
                }}/>
            )}
        </div>
    )
}

export default LineGraph
