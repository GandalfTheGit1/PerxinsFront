import React from 'react'
import { localType, eventType } from "../helpers/iconsRefs"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function SelectionType({serviceOrEvent,query,handleQueryChange}) {
    
  return (
    <div
    style={{marginLeft: "-8px"}}
    >
    {console.log(serviceOrEvent)}
    {serviceOrEvent==="service"?
    <FormControl 
    className="border-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Tipo de Local</InputLabel>
      <Select 
      id="selectButton"
      label='Tipo de Local'
      name='type'
      value={query.type}
      onChange={handleQueryChange("type")}
      className="inputs-changer font-size-25 inputs-changer font-size-25 font-color-white inputs-shape"
      color="primary"
      required
      style={{color: "white"}}
      >
        { localType.map((e, key) =>
           <MenuItem value={e.type} key={key}>
            <div style={{  
                display: "grid",
                gridTemplateColumns: "30px 1fr",
                justifyItems: "center",
            }}>
          <img src={e.icon} 
           style={{
            height: "25px",
            margin: "0px 25px 0px 25px",
          }}
           alt="" 
          />
            <span 
            className="font-color-white"
            style={{
                width: "70vw",
               // borderBottom: "1px solid",
                marginLeft: "10px",
            }}>{e.type}</span>
            </div>
           </MenuItem>
        )}
      </Select>
      </FormControl>
      :
      <FormControl className="inputs-changer font-size-25 border-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Tipo de Evento</InputLabel>
      <Select 
      id="selectButton"
      label='Tipo de Evento'
      name='type'
      value={query.type}
      onChange={handleQueryChange("type")}
      className="inputs-changer font-size-25 font-color-white inputs-shape"
      color="primary"
      required
      style={{color: "white"}}
      >
        { eventType.map((e, key) =>
            <MenuItem key={key} value={e.type}>
              <div style={{  
                display: "grid",
                gridTemplateColumns: "30px 1fr",
                justifyItems: "center",
                alignItems: "center",
            }}>
              <img src={e.icon} 
              style={{ 
                height: "25px",
                margin: "0px 25px 0px 25px"
              }} alt=""/>
            <span 
            className="font-color-white font-size-20"
            style={{
                width: "70vw",
                //borderBottom: "1px solid",
                marginLeft: "10px",
            }}>
            {e.type}
            </span>
            </div>
            </MenuItem>
        )}
      </Select>
      </FormControl>
    }</div>
  )
}

export default SelectionType