import React from 'react'
import './infoBox.css'
import {Card, CardContent, Typography} from '@material-ui/core'

const InfoBox = ({title, cases, active, isRed, isOrange, isGreen, total, ...props}) => {

    return (
        <Card className={`infoBox ${active && 'infoBox--selected'} ${active && isRed && 'infoBox--red'} ${active && isOrange && 'infoBox--orange'} `} onClick={props.onClick}>
           <CardContent>
               <Typography className='infoBox__title' color="textSecondary">
                    {title}
               </Typography>

               <h2 className={`infoBox__cases ${!isRed && !isOrange && 'infoBox__cases--green'} ${!isRed && !isGreen && 'infoBox__cases--orange'}`}>{cases}</h2>

               <Typography className='infoBox__total' color='textSecondary'>
                   {total} Total
               </Typography>
           </CardContent>
        </Card>
    )
}

export default InfoBox
