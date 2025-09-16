import React, { useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import {Link} from "react-router-dom"
import Menu from '../../SVG/Menu';
import installPrompt from '../../helpers/installPrompt';
import BasicAccordion from '../Accordion/BasicAccordion';

export default function TemporaryDrawer({displayOfInstallButton, deferredPrompt}) {

  const linksInMenu = [
    {
      accordionDeploy: "Cine",
      subcategory: [
        "3D",
        "Normal",
        "Clásico",
        "Animado",
      ]
    },{
      accordionDeploy: "Projects",
      subcategory: [
        "Universitarios",
        "Piscina",
        "Fiesta de Espuma",
      ]
    },{
      accordionDeploy: "Teatro",
      subcategory: [
        "Evento Cultural",
        "Concierto",
        "Humor",
      ]
    },{
      accordionDeploy: "Excursiones",
      subcategory: []
    }
  ]
  
  const linksContainer = useRef()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
    style={{
      width: "300px",
      background: "#181A1D",
      minHeight: "100%"
    }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    ><h3 
    className="font-color-white p-a font-size-25" 
    style={{top:"36px",left: "-22px", transform: "rotateZ(270deg)", letterSpacing: "2px"}}>
      menú
    </h3 >
    <div className="p-a b-white barMenuAnimation" ></div>
      <div className="d-f a-i-c f-d-c"
      style={{}}>
        <div 
          ref={linksContainer}
          className="d-f a-i-c f-d-c j-c-s-e" 
          style={{minHeight: "80vh"}}
          initial="close"
          animate="open"
        >
          {linksInMenu.map((link, key)=>(
            <BasicAccordion
              key={key}
              name={link.accordionDeploy}
            >
                {link.subcategory.map((e, key)=>(
                  <div key={key} className="d-f f-d-c">
                  <Link
                    to={ `/event?type=${link.accordionDeploy}&subcategory=${e}`}
                    style={{
                      color:"white",
                      margin: "5px 20px"
                    }}
                    onClick={toggleDrawer(anchor, false)}
                  >{e}</Link>
                  {
                  (key === link.subcategory.length - 1)
                  &&
                    <Link
                    to={ `/event?type=${link.accordionDeploy}`}
                    style={{
                      color:"white",
                      margin: "5px 20px"
                    }}
                    onClick={toggleDrawer(anchor, false)}
                    >Todos</Link>
                }
                </div>
                ))}
              
            </BasicAccordion>
          ))}
            <div
              onClick={()=>installPrompt(displayOfInstallButton, deferredPrompt)}
            >
          </div>
        </div>
        <h2 className='font-size-40 font-color-white'>Perxins</h2>
    </div>
  </div>
  );

  return (
    <div >
      
        <React.Fragment >
        <div className="left-navbar">
          <h1 onClick={toggleDrawer('left', true)} id="menu"> <Menu /> </h1>
        </div>
        <Drawer 
        anchor={'left'} 
        open={state['left']} 
        onClose={toggleDrawer('left', false)} 
        id=""
        >
            {list('left')}
        </Drawer>
        </React.Fragment>
      
    </div>
  );
}
