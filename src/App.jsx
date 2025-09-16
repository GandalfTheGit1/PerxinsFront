import React,{ useState, useEffect, useRef, Suspense} from "react";
import "./App.css";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import SearchAndFind from "./pages/SearchAndFind.jsx";
import RegistrationPage from "./pages/Auth/Registration/RegistrationPage";
import Login from "./pages/Auth/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Profile from "./pages/User/Profile.jsx";
import TemporaryDrawer from "./Components/Navbar/Navbar.jsx"
import { AuthContext } from "./helpers/AuthContext";

import Avatar from '@mui/material/Avatar';
import Home from "./pages/Home.jsx";
import IndividualPage from "./pages/IndividualPage.jsx";
//import Poll from "./pages/Supports/poll/Poll";
//import EmailSupport from "./pages/Supports/email/EmailSupport";
import Create from "./pages/createService/Creating"
//import EmailIcon from '@mui/icons-material/Email';
import ChangePassword from './pages/Auth/ChangePassword'
import SendEmailToChangePassword from "./pages/Auth/SendEmailToChangePassword"
import Presentation from './pages/Presentation/Presentation'
import Messages from "./pages/messages/Messages";
import BusinessOffers from "./pages/BusinessOffers";
import Notifications from "./Components/notification/Notifications";
import axios from "axios"
import PostManagement from "./pages/User/Components/PostManagement";
import DevOffers from "./pages/Business/DevOffers";
import ProServicesOffers from "./pages/Business/ProServicesOffers";
import ReactGA from 'react-ga';
//import TestComponent from "./pages/TestComponent";
import SimpleBackdrop from "./Animations/Backdrop";
import SearchServiceDialog from "./Components/SearchServiceDialog";
import { getSubscription } from "./helpers/notifyMe";
import PhoneIcon from "./SVG/phone.jsx"
import { mockUsers, mockServices } from './mockData.jsx'; // Import mock data
const Admin = React.lazy(() => import('./pages/Admin'));
const ExcelUpload = React.lazy(() => import("./pages/Admin/ExcelUpload"))
const Share = React.lazy(() => import("./pages/Admin/Share"))
function App() {
  // Initialize authState with mock user data
  const [authState, setAuthState] = useState({
    _id: mockUsers[0]._id,
    username: mockUsers[0].name,
    email: mockUsers[0].email,
    userPicture: mockUsers[0].profilePicture,
    actualProvince: "La Habana", // Example mock data
    musicalTastes: "Pop", // Example mock data
    subscriptions: mockServices.slice(0, 1).map(s => ({ _id: s._id, name: s.name, type: s.category })), // Example mock subscriptions
    isOwner: mockUsers[0].isOwner, // Example mock data
    role: mockUsers[0].role,
    status: true,
  });
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false)
  const [profileMenuStatus, setProfileMenuStatus] = useState(false)
  const [eventsQuery, setEventsQuery] = useState({
                                        province: "La Habana",
                                        type:"Project",
                                        township: "Playa",
                                        eventsDays: [],
                                        typeOfMusicPlayed: "Cualquiera"
                                      })
  const [serviceQuery, setServiceQuery] = useState({
                                        province: "La Habana",
                                        township: "Playa",
                                        type:"Bar",
                                        typeOfMusicPlayed: "Cualquiera"
                                      })
  const [loginError, setLoginError] = useState(false)
  const [openLoadingBackdrop, setOpenLoadingBackdrop] = useState(false)
const [searchServiceDialogOpen, setSearchServiceDialogOpen] = useState(false)
  const accessToken = localStorage.getItem("accessToken"); // Keep accessToken for conditional rendering if needed
  const location = useLocation();
  const actualRouteName = location.pathname.split("/")[1];
  const actualSubRouteName = location.pathname.split("/")[2];
  const deferredPrompt = useRef();
  const displayOfInstallButton = useRef("none");

  useEffect(()=>{
    ReactGA.initialize('G-43FRSBZ75Q');
    ReactGA.pageview(window.location.pathname + window.location.search);
  },[])

  useEffect(()=>{
      //addBtn.current.style.display = 'none';
      window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
    // Stash the event so it can be triggered later.
        deferredPrompt.current = e;
    // Update UI to notify the user they can add to home screen
        displayOfInstallButton.current = 'block';
      });
      return() =>{
        window.removeEventListener("beforeinstallprompt", ()=>{console.log("REMOVED")})
      }
  },[accessToken])

  // Comment out the useEffect that fetches user data for demo purposes
  //  useEffect(()=>{
  //   if(accessToken)
  //     {
  //       getSubscription()
  //       setIsNotificationPanelOpen(false)
  //       axios.get("http://localhost:3001/user/fullUser",{
  //         headers:  {'Authorization': 'Bearer '+ accessToken},
  //       }).then((e)=> {
  //         localStorage.setItem("userId", e.data._id);
  //         setAuthState(e.data);
  //       }).catch(e => console.log(e))
  //     }
  // },[accessToken])

  const logout = () => {
    localStorage.removeItem("accessToken");
    // Reset to a default mock user or empty state on logout
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App b-main" onClick={()=>{
      profileMenuStatus===true&&
        setProfileMenuStatus(!profileMenuStatus)

      isNotificationPanelOpen===true&&
        setIsNotificationPanelOpen(false)
    }}>

      <AuthContext.Provider value={{ 
        authState,              setAuthState,
        openLoadingBackdrop,    setOpenLoadingBackdrop,
        loginError,             setLoginError,
        searchServiceDialogOpen,setSearchServiceDialogOpen
        }}>
          <div className="navbar">
            <div className="links">
              <TemporaryDrawer
              deferredPrompt={deferredPrompt}
              displayOfInstallButton= {displayOfInstallButton}/>
            </div>
      {accessToken ?
      <div className="loggedInContainer">
          <div
            onClick={()=>setSearchServiceDialogOpen(true)}
            style={{
              background: "linear-gradient(to right,#DA4740,#2235DC)",
              padding: "3px",
              borderRadius: "7px",
              marginRight: "10px"
              }}>
            <div style={{background: "#181a1d",borderRadius: "6px",padding: "5px"}}>
              Publicar
            </div>
          </div>
          <div className="d-f a-i-c">
              <Notifications
                setIsNotificationPanelOpen={setIsNotificationPanelOpen}
                isNotificationPanelOpen = {isNotificationPanelOpen}
              />

            <Avatar
              alt=""
              src={authState.userPicture}
              onClick={()=>{setProfileMenuStatus(!profileMenuStatus)}}
              id="background-transparent"
            />
            
            {profileMenuStatus&&<div className= {profileMenuStatus? "avatar-menu avatar-menu-active" : "avatar-menu"}>
              <Link to={`/profile/${authState._id}`}>Perfil</Link>
              <Link onClick={logout} to="/login">Cerrar Sesión</Link>
              </div>}
            </div>
          </div>:
          <div className="loggedInContainer">
              <Link to="/login"> Iniciar Sesión </Link>
              <Link to="/registration" > Suscríbete </Link>
          </div>
          }
        </div>
          {(actualRouteName !== "presentation" && actualSubRouteName !== "message") &&
          <div className="circleButton" id="circleButtonRight">
            <a 
              target="_blank" 
              rel="noreferrer"
              href={"https://wa.me/+5358419139?text=Buenas%0aQuería contactar con ustedes para "} >
              <PhoneIcon fill="#10E465"  alt="C" className="svgIcon" />
            </a>
          </div>}
          <Switch location={location} key={location.pathname}>
            <Route path="/service" exact >
              <SearchAndFind 
                setQuery={setServiceQuery}
                query={serviceQuery}
                likesUrl={"http://localhost:3001/likes"} 
                apiURL={"http://localhost:3001/services"} 
                serviceOrEvent={"service"}
              />
            </Route>
            <Route path="/" exact >
              <Home
                displayOfInstallButton={displayOfInstallButton} 
                deferredPrompt={deferredPrompt}
              />
            </Route>

            <Route path="/cine/:subcategory" exact >
              <SearchAndFind 
                query={eventsQuery}
                setQuery={setEventsQuery}
                likesUrl={"http://localhost:3001/eventsLikes"}
                apiURL={"http://localhost:3001/events"}
                serviceOrEvent={"event"}
              />
              </Route>

            <Route path="/event" exact >
              <SearchAndFind 
                query={eventsQuery}
                setQuery={setEventsQuery}
                likesUrl={"http://localhost:3001/eventsLikes"}
                apiURL={"http://localhost:3001/events"}
                serviceOrEvent={"event"}
              />
            </Route>
            <Route path="/registration" exact component={RegistrationPage} />

            <Route path="/service/message/:id" >
              <Messages serviceOrEvent="service" />
            </Route>

            <Route path="/event/message/:id" >
              <Messages serviceOrEvent="event" />
            </Route>

            <Route path="/presentation" exact >
              <Presentation
              deferredPrompt={deferredPrompt}
              />
              </Route>
            <Route path="/login" exact component={Login} />
            <Route path="/service/:id" exact >
              <IndividualPage
              serviceOrEvent={"service"} />
            </Route>
            <Route path="/event/:id" exact >
              <IndividualPage
              serviceOrEvent={"event"} />
            </Route>
            <Route path="/createService" exact>
              <Create 
                  serviceOrEvent={"service"} 
                  method={"post"}
                  route={"http://localhost:3001/services/create"}
              />
            </Route> 
            <Route path="/updateservice/:id" exact>
              <Create 
                  serviceOrEvent={"service"} 
                  method={"patch"}
                  route={"http://localhost:3001/services/"}
               />
            </Route> 
            {/*<Route path="/poll" exact component={Poll} />*/}
            <Route path="/SendEmailToChangePassword" exact component={SendEmailToChangePassword} />
            <Route path="/changePassword/:id" exact component={ChangePassword} />
            {/* <Route path="/email" exact component={EmailSupport} /> */}
            <Route path="/profile/:id" exact>
              <Profile displayOfInstallButton={displayOfInstallButton} deferredPrompt={deferredPrompt}/>
            </Route>
            <Route path="/profilePostsAdmin/:id" exact>
              <PostManagement authState={authState}/>
            </Route>
            <Route path="/proServicesOffers" exact component={ProServicesOffers} />
            <Route path="/devOffers" exact component={DevOffers} />
            <Route path="/createEvent" exact>
              <Create 
                serviceOrEvent={"event"} 
                method={"post"}
                route={"http://localhost:3001/events/create"}
              />
            </Route>
            <Route path="/createEvent/:id" exact>
              <Create 
                serviceOrEvent={"event"} 
                method={"post"}
                route={"http://localhost:3001/events/create"}
              />
            </Route>
            <Route path="/updateevent/:id" exact>
              <Create 
                serviceOrEvent={"event"} 
                method={"patch"}
                route={"http://localhost:3001/events/"}
              />
            </Route> 
            <Route path="/businessOffers" exact component={BusinessOffers} />
 
            {/* TODO: Comment before Launch */}
            
              <Suspense fallback={()=><h1>Cargando...</h1>}>
              <Route path="/test" exact component={ExcelUpload} />
              <Route path="/admin" component={Admin}/>
              <Route path="/shareWhatsApp" component={Share}/>
              
            </Suspense>
 
            <Route path="" component={PageNotFound} />
            </Switch>
          <SimpleBackdrop 
            open={openLoadingBackdrop}
            setOpen={setOpenLoadingBackdrop}
          />
          <SearchServiceDialog/>
      </AuthContext.Provider>
    </div>
  );
}

export default App;