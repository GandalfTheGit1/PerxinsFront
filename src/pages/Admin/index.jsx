import React,{ useState, useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import WrapperSection from "./WrapperSection";
import ServicesAccordion from "../../Components/Accordion/ServicesAccordion";
import UsersAccordion from "../../Components/Accordion/UsersAccordion";

function Admin() {
  const [adminWindow, setAdminWindow] = useState(0)
  const [allServices, setServices] = useState([])
  const [searchBarValue, setSearchBarValue] = useState("")

  const eventsRoutes = {
    getAllRoute: "http://localhost:3001/events/findForAdmin",
    perxinsGiftRoute: "http://localhost:3001/events/perxinsGift/",
    isPayingRoute: "http://localhost:3001/events/isPaying/",
    updateRoute: '/updateevent/',
    deleteRoute : "http://localhost:3001/events/admin/",
    getCountRoute: "http://localhost:3001/events/count",
  }

  const servicesRoutes = {
    getAllRoute: "http://localhost:3001/services/findForAdmin",
    perxinsGiftRoute: "http://localhost:3001/services/perxinsGift/",
    isPayingRoute: "http://localhost:3001/services/isPaying/",
    updateRoute: '/updateservice/',
    deleteRoute : "http://localhost:3001/services/admin/",
    getCountRoute: "http://localhost:3001/services/count",
  }

  const usersRoutes = {
    getAllRoute: "http://localhost:3001/user/findForAdmin/",
    isAuthRoute: "http://localhost:3001/user/changeAuth/",
    isAdminRoute: "http://localhost:3001/user/changeAdmin/",
    getCountRoute: "http://localhost:3001/user/count/",
  }

  const handleWindowChange = () =>{
    switch(adminWindow){
      case 0:
        return (<div>
        <WrapperSection
              routes={eventsRoutes}
              searchBarValue={searchBarValue}
              setAllEvents={setServices}
              setSearchBarValue={setSearchBarValue}
            >
            <ServicesAccordion
              services={allServices}
              routes={eventsRoutes}
              searchBarValue={searchBarValue}
            />
          </WrapperSection>
        </div>)

      case 1:
        return (
          <>
             <WrapperSection
                routes={servicesRoutes}
                searchBarValue={searchBarValue}
                setAllEvents={setServices}
                setSearchBarValue={setSearchBarValue}
                >
                  <ServicesAccordion
                   services={allServices}
                   routes={servicesRoutes}
                   searchBarValue={searchBarValue}
                />
                  </WrapperSection> 
          
          </>)

      case 2:
        return (
          <div>
            <WrapperSection
              routes={usersRoutes}
              searchBarValue={searchBarValue}
              setAllEvents={setServices}
              setSearchBarValue={setSearchBarValue}
            >
              <UsersAccordion
                users={allServices}
                routes={usersRoutes}
                searchBarValue={searchBarValue}
              />
            </WrapperSection>
          </div>
        )

      default:
        return <div>
                <p>Error en los Pasos a seguir</p>
               </div>
           }
    }

    const handleButtonOptions = (page) => {
      console.log("page" ,adminWindow)
      
      setAdminWindow(page)}

  return (
    <div style={{paddingTop: "65px"}}>
      <div className="d-f j-c-s-e">
        <button onClick={()=> handleButtonOptions(0)}>Eventos</button>
        <button onClick={()=> handleButtonOptions(1)}>Locales</button>
        <button onClick={()=> handleButtonOptions(2)}>Usuarios</button>
      </div>
      {handleWindowChange()}
    </div>
  )
}

export default Admin
/*
  ; */