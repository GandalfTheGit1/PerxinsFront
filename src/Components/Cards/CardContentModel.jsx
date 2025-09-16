import React from 'react'
import eventsDaysRendering from '../../helpers/eventsDaysRendering'
import CardContent from '@mui/material/CardContent';
import CoversExposure from '../CoversExposure';

function CardContentModel({
  service
}) {
  const {
    name,
    type,
    cover,
    time
  } = service;
  const { startHour = '', exitHour = '' } = time || {};
  return (
    <CardContent className="font-color-white t-a-s d-f f-d-r">
          <div className="d-f j-c-c t-a-c">
            <div className="d-f t-a-c a-i-c f-d-c j-c-c font-bold" style={{marginRight: "15px"}}>
              {time && eventsDaysRendering(time)}
            </div>
          </div>
          <div 
          className="d-f j-c-c f-d-c font-bold"
          style={{
              width: "90%",
             letterSpacing: "1px"
            }}>
            <div className='font-bold'>
              <span>{type!=="Presentación Teatral"&& type}</span>
              -
              <span className='font-bold'> {name}</span>
             {/* {placeToSetEvent&&<p style={{fontSize: "14px"}}>{placeToSetEvent}</p>} */}
             <hr style={{width: "90%"}}/>
            </div>
            <div className="cardBody" style={{paddingTop:"1vh"}}>
              <div className="font-color-white font-bold" style={{fontSize: "14px"}}>
                  <span className='font-bold'>{startHour} - {exitHour} </span>
                  {cover &&
                  <CoversExposure
                    cover={cover}
                  />
                  }
                  
              </div>
            </div>
          </div>
        </CardContent>
  )
}

export default CardContentModel

