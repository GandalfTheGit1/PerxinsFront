import { 
  useState, 
  useEffect, 
  useContext,
  useRef,
  useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import ShareIcon from '@mui/icons-material/Share';
import Cards from "../Components/Cards.jsx";
import useCheckToken from "../Hooks/useCheckToken";
import ShareModal from "../common/Components/ShareComponents/ShareModal";
//import TextField from '@mui/material/TextField';
//import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import provinceAndTownships from "../helpers/provinceAndTownships";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux'
import { getMoreServices, eraseAllServices, changeLikeServices } from "../Redux/Service/serviceSlice"
import { getMoreEvents, eraseAllEvents, changeLikeEvents } from "../Redux/Event/eventSlice"
import SelectionType from "../Components/SelectionType";
import {typeOfMusicPlayedForSearch} from "../helpers/typeOfMusicPlayed"
import Favorite from "../SVG/Favorite";
import Comment from "../SVG/Comment";
import FavoriteBorder from "../SVG/FavoriteBorder";
import {eventsDaysFormate} from "../helpers/eventsDaysRendering";
import axios from "axios";
import {weekEntireDay} from "../helpers/weekDay";
import Search from "../SVG/Search";
import townshipBinds from "../helpers/townshipBinds";
import ReactHelmet from "../common/Components/SEO/ReactHelmet";
import SubmitDialog from "../common/Components/SubmitDialog";
import perxinsIcon from "../SVG/PenroseTriangle.png"
import { Link } from "react-router-dom";
import EliminateKey from "../helpers/EliminateKey";
import { mockServices, mockEvents, mockLikes } from '../mockData.jsx'; // Import mock data
import { likes, services, events } from '../services/mockServices';

function SearchAndFind({ likesUrl, apiURL, serviceOrEvent, query, setQuery}) {
  const { authState, setOpenLoadingBackdrop } = useContext(AuthContext);
  const [search, setSearch] = useState(true)

  const [shareValues, setShareValues] = useState({})
  const [open, setOpen] = useState(false);
  const [likedServices, setLikedServices] = useState([])
  const [nextSearchQuery, setNextSearchQuery] = useState(false)

  const serviceReduxStore = useSelector((state) => state.serviceReduxStore);
  const eventReduxStore = useSelector((state) => state.eventReduxStore);
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { _id } = authState;
  let history = useHistory();

  const searchDefaultOnBottom = useRef({
    skip: 10,
    isDefaultSearch: true,
  });
  const observer = useRef()

  const handleClickOpen = () => setOpen(true);
  const setApiCall = useCheckToken(()=>{})
  const handleClose = () => setOpen(false);
  const getLikedService = useCallback(async () => {
    if (authState._id) {
      const userLikes = mockLikes.filter(l => l.userId === authState._id && l.liked);
      setLikedServices(userLikes.map(l => l.serviceId || l.eventId));
    }
  }, [authState._id]);

  const handleServicesFetching = (data) => {
    const newData = data.sort(e => {
      const {time} = e;
      if(time?.eventsDays) return -1
      if(time?.weekDays) return 0
      if(time?.continuesEventsStartDay) return 1
      else return 0
    })
    serviceOrEvent==="service"?
    dispatch(getMoreServices(newData)):
    dispatch(getMoreEvents(newData))
    setSearch(false);
  }

  // Modified searchByQuery to use mock data
  const searchByQuery = (url) => {
    query = EliminateKey(query)
    // const urlQueries = new URLSearchParams(query).toString()
    //   setApiCall("get",`${url}?${urlQueries}`)
    //   .then( response => handleServicesFetching(response))
    //   .then(() => {
    //     getLikedService()
    //     setOpenLoadingBackdrop(false)
    //     console.log( searchDefaultOnBottom.current.isDefaultSearch)
    //     searchDefaultOnBottom.current.isDefaultSearch = false;
    //     console.log( searchDefaultOnBottom.current.isDefaultSearch)
    //   })
    //   .catch((e)=> {
    //     setError(true)
    //     setOpenLoadingBackdrop(false)
    //   })
    //   setOpenLoadingBackdrop(false)
    setOpenLoadingBackdrop(true)
    const filteredData = serviceOrEvent === "service" ? mockServices : mockEvents;
    handleServicesFetching(filteredData);
    getLikedService();
    setOpenLoadingBackdrop(false);
    searchDefaultOnBottom.current.isDefaultSearch = false;
  }

  const urlParams = new URLSearchParams(window.location.search)
  // Modified setDefaultSearch to use mock data
  const setDefaultSearch = (url) => {
    setOpenLoadingBackdrop(true)
    // setApiCall("get", `${url}?${urlParams}`)
    //   .then( response => handleServicesFetching(response))
    //   .then(() => {
    //     getLikedService()
    //     setOpenLoadingBackdrop(false)
    //   })
    //   .catch((e)=> {
    //     setError(true)
    //     setOpenLoadingBackdrop(false)
    //   })
    //   setOpenLoadingBackdrop(false)
    const dataToUse = serviceOrEvent === "service" ? mockServices : mockEvents;
    handleServicesFetching(dataToUse);
    getLikedService();
    setOpenLoadingBackdrop(false);
  }
  
  // Modified setDefaultSearchOnSkip to use mock data
  const setDefaultSearchOnSkip = (url) => {
    // setApiCall("get",`${url}?${urlParams}&skip=${searchDefaultOnBottom.current.skip}` )
    //   .then( response => handleServicesFetching(response))
    //   .then(() => {
    //     getLikedService()
    //     searchDefaultOnBottom.current.skip += 10;
    //     setOpenLoadingBackdrop(false)
    //   })
    //   .catch((e)=> {
    //     setError(true)
    //     setOpenLoadingBackdrop(false)
    //   })
    //   setOpenLoadingBackdrop(false)
    setOpenLoadingBackdrop(true);
    const dataToUse = serviceOrEvent === "service" ? mockServices : mockEvents;
    // Simulate pagination by slicing the mock data
    const startIndex = searchDefaultOnBottom.current.skip;
    const paginatedData = dataToUse.slice(startIndex, startIndex + 10); // Fetch 10 items
    handleServicesFetching(paginatedData);
    getLikedService();
    searchDefaultOnBottom.current.skip += 10;
    setOpenLoadingBackdrop(false);
  }
  const onSearch = (e) => {
    setOpenLoadingBackdrop(true)
    if(e) {
      serviceOrEvent==="service"?
      dispatch(eraseAllServices()):
      dispatch(eraseAllEvents())
      e.preventDefault()
    }
    query.weekDays = []
    if(serviceOrEvent==="event"){
      query.eventsDays = query.eventsDays.sort((dateA, dateB)=>{
        return new Date(dateA) - new Date(dateB);
      })
      query.eventsDays.forEach( dayString =>{
        const date = new Date(dayString.replace(/-/g, '\/')).getDay();
        query.weekDays.push(date);
      })
    }
    //query.weekDays = [weekDayArray];

    searchByQuery(apiURL)

  }
  const handleQueryChange = input => e =>{
    setQuery({...query, [input]: e.target.value})
  }
  const likeAService = async (serviceId) => {
    if (!authState._id) {
      setLoginError(true);
      return;
    }
    console.log('Liking', serviceId, 'for user', authState._id, 'type', serviceOrEvent);
    try {
      // Always like for demo: get from mock, increment
      const itemService = serviceOrEvent === 'service' ? services : events;
      const item = await itemService.getById(serviceId);
      const currentLikes = item.numberOfLikes || 0;
      const newLikes = currentLikes + 1;
      item.numberOfLikes = newLikes;
      itemService.saveData();
      // Dispatch new count to Redux
      const payload = { serviceId, serviceLikes: newLikes };
      if (serviceOrEvent === 'service') {
        dispatch(changeLikeServices(payload));
      } else {
        dispatch(changeLikeEvents(payload));
      }
      // Ensure in likedServices for icon
      setLikedServices(prev => prev.includes(serviceId) ? prev : [...prev, serviceId]);
      // Add like entry if not exists
      const likesService = new MockService('likes');
      const existing = likesService.data.find(l => l.userId === authState._id && (l.serviceId === serviceId || l.eventId === serviceId));
      if (!existing) {
        const newLike = {
          _id: `like_${Date.now()}`,
          userId: authState._id,
          [serviceOrEvent === 'service' ? 'serviceId' : 'eventId']: serviceId,
          liked: true,
          createdAt: new Date().toISOString(),
        };
        likesService.data.push(newLike);
        likesService.saveData();
      }
      // Notify owner if different
      const ownerId = item.ownerId || item.organizerId;
      if (ownerId && ownerId !== authState._id) {
        const notificationsService = new MockService('notifications');
        const newNotif = {
          _id: `notif_${Date.now()}`,
          userId: ownerId,
          type: 'like',
          message: `${authState.name || 'User'} liked your ${serviceOrEvent}`,
          relatedId: serviceId,
          read: false,
          createdAt: new Date().toISOString(),
        };
        notificationsService.data.unshift(newNotif);
        notificationsService.saveData();
      }
      console.log('Like added for', serviceOrEvent, { numberOfLikes: newLikes });
    } catch (error) {
      console.error('Like error:', error);
      setLoginError(true);
    }
  };
  const sharingCard = async (serviceId, name) => {
    if (!authState._id) {
      setLoginError(true);
      return;
    }
    console.log('Share simulated for', serviceId);
    try {
      if (serviceOrEvent === 'service') {
        await services.share(serviceId, authState._id, authState.name);
      } else {
        await events.share(serviceId, authState._id, authState.name);
      }
      setShareValues({ url: serviceId, quote: name });
      handleClickOpen();
    } catch (error) {
      console.error('Share error:', error);
    }
  };
  const getNewDataAfterBottom = (township) => {
    query.township = township
    searchByQuery(`${apiURL}/findBasic`)
  }

  const footerCard = (service)=>{
    return (
      <div className="cardFooterContainer d-f">
                <div
                className="like d-f a-i-c j-c-c"
                onClick={()=>likeAService(service._id)}
                >
                  {(likedServices.some(element =>
                     element === service._id
                    ))? <Favorite /> :  <FavoriteBorder />}
                  <label className="font-color-white"> {service.numberOfLikes || 0}</label> {/* Use 0 for mock data */}
                </div>

                <div className="footerCardBottomsContainer d-f a-i-c f-d-c j-c-c" onClick={()=>{ history.push(`/${serviceOrEvent}/message/${service._id}`)}}>
                  <Comment/>
                </div>

                <div className="footerCardBottomsContainer d-f a-i-c f-d-c j-c-c"
                  onClick={async () => {
                  await sharingCard(service._id, service.name);
                }}
                  >
                  <ShareIcon style={{color: "#40A3DA", width: "30px", height: "30px"}}/>
                </div>
                {service.perxinsGift &&
                <div className="d-f j-c-f-e a-i-c" style={{width: "35%"}}>
                  
                  <img src={perxinsIcon} style={{width:"25px"}} alt="Gift"/>
                </div>}
              </div>
    )
  }

  useEffect(()=>{
    if(accessToken) getLikedService()

    if((serviceReduxStore.length !== 0) && (serviceOrEvent==="service")){
      setSearch(false);
    }
    else if(serviceOrEvent==="event" && eventReduxStore?.length !== 0){
      setSearch(false);
    }
    else{
      // Use mock data for default search
      const dataToUse = serviceOrEvent === "service" ? mockServices : mockEvents;
      handleServicesFetching(dataToUse);
      setSearch(false);
    }
  },[])

  const lastElementObserver = useCallback((node)=>{
    if(observer.current) {
      //que hace disconnect?
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        console.log( "1", searchDefaultOnBottom.current.isDefaultSearch)
        if(searchDefaultOnBottom.current.isDefaultSearch){
          setDefaultSearchOnSkip(
            // "http://localhost:3001/services/defaultSearchOnSkip" // No longer needed
            )
        }
        else{
          setNextSearchQuery(true)
        }
      }
    })

    if(node) observer.current.observe(node)
  },[])

  const observerEvent = useRef()
  const lastEventObserver = useCallback((node)=>{
    console.log( "1", searchDefaultOnBottom.current.isDefaultSearch)
    if(observerEvent.current) {
      observerEvent.current.disconnect()
    }
    observerEvent.current = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        if(searchDefaultOnBottom.current.isDefaultSearch){
          setDefaultSearchOnSkip(
            // "http://localhost:3001/events/defaultSearchOnSkip" // No longer needed
            )
        }
        else{
          setNextSearchQuery(true)
        }
      }
    })
    if(node) observerEvent.current.observe(node)
  },[])

  let lastDay = ""
  const isNewDay = (serviceTime, isPaying, weekDays, continuesEventsEndDay) => {
    if(serviceTime===lastDay){
      return
    }
    if(isPaying){
      return <div>
              <p>Recomendados </p>
              <hr/>
            </div>
    }
    if(weekDays){
      return <div>
              <p>Repetidos los {weekEntireDay[+weekDays]}</p>
              <hr/>
            </div>
    }
    if(continuesEventsEndDay && lastDay !== "continuesEventsEndDay"){
      lastDay = "continuesEventsEndDay";
      return <div>
          <p>Eventos de más de un día</p>
          <hr/> 
        </div>
    }
    if(serviceTime) {
      lastDay = serviceTime
      serviceTime = new Date(serviceTime)
      return <div>
              <p>{serviceTime.getDate()+1} - {serviceTime.getMonth()+1} </p>
              <hr/>
            </div>
    }
  }

  return (
    <ReactHelmet
    title={`Buscar ${serviceOrEvent==="service"?"Locales":"Eventos"}`}
    description={`Buscar ${serviceOrEvent==="service"?"Locales":"Eventos"} en La Habana`}
    >
    <div>
      {search
      ?<form onSubmit={onSearch} id="authContainer"> 
      {error&& <p className="errorMessage">Compruebe su conexión</p>}
      <p className="font-size-25 font-color-white">
        Buscar en Perxins
      </p>
        <p className="font-size-25 font-color-gray">{serviceOrEvent==="service"?"Locales":"Eventos"}</p>
        <FormControl 
          className="border-blue inputs-changer"
          variant="standard" 
          sx={{ m: 1, minWidth: 120 }}
        >
        <InputLabel 
          id="demo-simple-select-helper-label" 
          style={{color:"white"}}
        >
          Provincia
        </InputLabel>
        <Select 
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label='Provincia'
          name='province'
          value={query.province}
          onChange={handleQueryChange("province")}
          className="border-blue font-size-25 font-color-white inputs-shape"
          color="primary"
          required
          //defaultValue={"La Habana"}
          style={{color: "white"}}
          >
            { provinceAndTownships.map((e,key) => 
             <MenuItem key={key} value={e.province}>{e.province}</MenuItem>
            )
            }
          </Select>
          </FormControl>
          <FormControl className="border-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Municipio</InputLabel>
          <Select 
            id="selectButton"
            label='Municipio'
            name='township'
            value={query.township}
            onChange={handleQueryChange("township")}
            className="font-color-white inputs-shape box-shadow"
            color="primary"
            required
            style={{color: "white"}}
          >
            { provinceAndTownships.map((e,key) => {
            if(e.province === query.province){
             return e.township.map((township,key2)=>
                <MenuItem key={key} key2={key2} value={township}>{township}</MenuItem>
                )
            }
            })}
          </Select>
          </FormControl>
          <SelectionType 
            serviceOrEvent={serviceOrEvent}
            query={query}
            handleQueryChange={handleQueryChange}
          />
          {/* <button onClick={()=> setOpenDialog(true)}>hola</button> */}
      {serviceOrEvent==="event"&&
        <div>
          <input 
            placeholder="Elige un Día" 
            type="date"
            id="anchor-playground"
            style={{
              height: "1.4375em",
              padding: "13px 2vw 15px 2vw",
              background: "#2e343b00",
              fontFamily:'Montserrat, sans-serif',
              border: 0,
              width: "80vw",
              borderBottom: "1px solid #008cff"
            }}
            className="font-color-white margin-top-3vh"
            label="Días"
            name="eventsDays"
            value={query.eventsDays[query.eventsDays.length - 1]}
            required
            onChange={(e)=> {if(!query.eventsDays.some(day =>day===e.target.value ))setQuery({...query, eventsDays: [...query.eventsDays, e.target.value]})}}
            />
      </div>}
      {serviceOrEvent==="event" &&
        <div className='centerElement'>
          {query.eventsDays.map((e,key)=>
          <div
          key={key}
          className='eventsDays' 
          onClick={()=>{
            setQuery({...query, eventsDays : [...query.eventsDays.filter(date=> date!==e)]})
          }}
          style={{"flexDirection":"row"}}>
            <p className="d-f f-d-c t-a-c">{eventsDaysFormate(e)}</p>
          </div>
          )}
        </div>
      }

      <FormControl className="border-pallid-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Preferencia Músical</InputLabel>
          <Select 
          placeholder=" "
          id="selectButton"
          label='Preferencia Músical'
          name='typeOfMusicPlayed'
          value={query.typeOfMusicPlayed}
          onChange={handleQueryChange("typeOfMusicPlayed")}
          className="inputs-changer font-size-25 font-color-white inputs-shape"
          color="primary"
          defaultValue={""}
          >
          {typeOfMusicPlayedForSearch.map((e,key)=>
          <MenuItem key={key} value={e}>{e}</MenuItem>
            )}
        </Select>
        </FormControl>
        <div className="d-f j-c-c w-85vw">
        </div>
        
        <button 
        type="submit"
        className="d-f j-c-c a-i-c b-button font-color-white border-0 h-45px inputs-shape margin-top-5vh font-size-25 margin-top-3vh">
          <p style={{marginRight: "10px"}}>Buscar</p> <Search/>
        </button>
        <div style={{marginBottom:"3vw"}}></div>
      </form>
      :
      <div className="d-f j-c-c a-i-c f-d-c a-c-c">
        {loginError&& <p className="t-a-c errorMessage">Debe iniciar sesión</p>}
      <p style={{
        background: "#181818",
        padding: "5px",
        borderRadius: "16px",
        marginTop: "3vh",
        color: "white",
      }}>Resultados de la busqueda:</p>
      {
      serviceOrEvent==="service"?
        serviceReduxStore.map((service, key) => {
        return (
          <div ref={lastElementObserver} key={key}>
          
            <Cards
              service={service}
              serviceOrEvent={serviceOrEvent}
              key={key}>
                {footerCard(service)}
            </Cards>
          </div>
        )}):
        eventReduxStore.map((service, key) => {
          return (
            <div 
            ref={lastEventObserver}
            key={key}
            >
            <div className="font-color-white" style={{marginTop: "3vh"}}>
              <p>{isNewDay(service.time.eventsDays, service.isPaying, service.time.weekDays, service.time.continuesEventsEndDay)}</p>
              
              </div>
            <Cards
              service={service}
              serviceOrEvent={serviceOrEvent}
              key={key}>
                {footerCard(service)}
            </Cards>
            </div>
          )})
        }

        {nextSearchQuery&&<div className="p-r" style={{margin: "5vh 0 15vh 0", width: "90%"}}>
          <p className="font-color-white">Desea ver otras ofertas en:</p>
          <div style={{width:"90%", top: "30px"}} className="p-a">
            {townshipBinds.map((bindsPerTownship,key) => {
            if(bindsPerTownship.township === query.township){
              return (bindsPerTownship.connections.map((e,key2) => <button
              key={key2 + key}
              className=" border-radius-50 font-color-white"
              style={{
                padding: "3px 8px",
                fontSize: "16px",
                letterSpacing: "0.5px",
                border: "0px",
                margin: "2px 5px",
                borderRadius: "50px",
                background: "#0e0e0e"
              }}
              onClick={()=>getNewDataAfterBottom(e)}
              >{e}</button>))
            }
          })}
          </div>
          </div>}
      </div>
      }
      
      <div onClick={()=>{
          setSearch(!search)
          searchDefaultOnBottom.current.isDefaultSearch = false
          }} className="circleButton" id="circleButtonLeft">
          <Search color="white" className="svgIcon"/>
        </div>
        <ShareModal 
          quote={shareValues.quote}
          url={shareValues.url}
          hashtag={"QuieroSalir!!"}
          open={open}
          onClose={handleClose}
          />
    </div>
    <SubmitDialog
    open={openDialog}
    setOpen={setOpenDialog}
    />
    </ReactHelmet>
  );
}

export default SearchAndFind;
/* <TextField 
          label='Nombre'
          name='name' 
          type="text" 
          value={query.name} 
          onChange={handleQueryChange("name")}
          color="primary"
        variant="standard"
        className="font-color-white inputs-shape box-shadow margin-top-5vh"
        /> */