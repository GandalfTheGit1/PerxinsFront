import React from 'react'
import { Link } from "react-router-dom";
import LocalImage from "../SVG/LocalsImage.png"
import EventsImage from "../SVG/EventsImage.png"
import BusinessOffers from "../SVG/BusinessOffers.png"
import PagesFooter from './PagesFooter';
import installPrompt from '../helpers/installPrompt';
import { useParams } from 'react-router-dom';

function Home({deferredPrompt, displayOfInstallButton}) {
    const {comida} = useParams();

    React.useEffect(() => {
    }, [comida])
    

    const individualService = {
        contact:{
            pageFootersName : "PERXINS",
            facebookLink : "https://m.facebook.com/Perxins-103949482452169",
            TwitterLink : "https://mobile.twitter.com/Perxinsencuba",
            InstagramLink : "https://www.instagram.com/PerxinsenCuba",
            whatsApp : "+5358419139",
            email : "perxins@gmail.com",
    }
    }
    const sections = [
    {
        sectionImg: LocalImage, sectionHeader: "Locales", sectionRoute: "service" 
    },
    {   sectionImg: EventsImage, sectionHeader: "Eventos", sectionRoute: "event"
    },{
        sectionImg: BusinessOffers, sectionHeader: "Negocios y Promoción", sectionRoute: "businessOffers"
    }]
    return (
        <div className="font-color-white d-f f-d-c t-a-c">
                <h1 className='font-size-32' style={{margin: "15px"}}>Perxins</h1>
                <p
                    style={{ marginBottom: "25px"}} 
                    className='font-size-25'>
                        Nuestras Mejores Ofertas
                </p>

                <button
                style={{
                    width: "200px",
                    height: "45px",
                    background: "linear-gradient(0deg,#87168b,#005eff)",
                    border: "0px solid",
                    fontSize: "1.1rem",
                    maxWidth: "200px",
                    alignSelf:"center",
                    marginBottom:"10px",
                    borderRadius:"26px",
                    display: `${displayOfInstallButton.current}`}}
                onClick={()=>{
                    installPrompt(deferredPrompt, displayOfInstallButton)}}
                >
                Instalar Aplicación
                </button>
            <div className='d-f j-c-c f-w-w' style={{"margin": "25px 0"}}>
            {sections.map((e, key) =>{
                return(
                <Link key={key} to={`/${e.sectionRoute}`} className="font-color-white">
                    <div style={{
                    background: `url(${e.sectionImg})`,     
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "center"
                    }} className="landingPageImagesContainers d-f j-c-c a-i-c">
                        <p className="font-size-25">{e.sectionHeader}</p>
                    </div>
                </Link>)
                })}
            </div>
            <PagesFooter
            individualService={individualService}
            />
        </div>
    )
}

export default Home
