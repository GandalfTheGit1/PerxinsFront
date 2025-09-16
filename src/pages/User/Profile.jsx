import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { Avatar } from "@mui/material";
import "./Profile.css"
//import useCheckToken from "../../Hooks/useCheckToken";
import Compressor from 'compressorjs';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Dialog } from '@mui/material/';
import { Link } from "react-router-dom";
//import weekDay from "../../helpers/weekDay";
//import eventsDaysRendering from "../../helpers/eventsDaysRendering"
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import provinceAndTownships from "../../helpers/provinceAndTownships";
import typeOfMusicPlayed from "../../helpers/typeOfMusicPlayed"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import UnsubscribeButton from "../../common/Components/UnsubscribeButton";
import installPrompt from "../../helpers/installPrompt";

function Profile({deferredPrompt, displayOfInstallButton}) {
  const { authState, setAuthState } = useContext(AuthContext);
  const [userImages, setUserImages] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const accessToken = localStorage.getItem("accessToken")
  
  const handleImageUpload = (e) =>{
    setIsLoading(true)
    for(let i= 0; i < e.target.files.length; i++){
      new Compressor(e.target.files[i], {
      quality: 0.6,

      success(result) {
        const formData = new FormData();
        formData.append("file", result)
        formData.append("upload_preset", "UsersPics")
        axios.post("https://api.cloudinary.com/v1_1/dolzgvsos/image/upload",
        formData)
        .then(e =>{
          setUserImages(e.data.secure_url)
          setAuthState({...authState, userPicture:e.data.secure_url })
            // axios.post("http://localhost:3001/user/userPic",{userPicture:e.data.secure_url},
            // {
            //   headers:  {'Authorization': 'Bearer '+ accessToken},
            // } )
            // .catch(e=> console.log(e))
            setIsLoading(false)
        })
        .catch(e => console.log(e))
        
      },

      error(err) {
        console.log(err.message);
      },})
    }
  }

  

  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [updateFormValues, setUpdateFormValues] = useState({})

  const changeAuthState = (e)=>{
    e.preventDefault()
    Object.keys(updateFormValues).forEach(key => {
      if (
        updateFormValues[key] === ''  ||
        updateFormValues[key] === null||
        (Array.isArray(updateFormValues[key]) && updateFormValues[key].length === 0)  ||
        updateFormValues[key] === ""  ||
        updateFormValues[key] === "Ninguno"
      ) {
        delete updateFormValues[key];
      }
    });
    // axios
    //     .patch('http://localhost:3001/user/update', updateFormValues,
    //     { headers: {'Authorization': 'Bearer '+ accessToken},}
    //   )
    //   .then(() => {
    //     setAuthState({...authState, ...updateFormValues})
    //     setOpenUpdateModal(false)
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    setAuthState({...authState, ...updateFormValues})
    setOpenUpdateModal(false)
    console.log("User profile update disabled for demo.");
  }

  const handleUpdateFormValues = input => e =>{
    setUpdateFormValues({...updateFormValues,[input]: e.target.value,})
  }
  return (
    <div style={{width: "90%", margin: "auto"}} className="font-color-white profilePageContainer font-color-white" >
      <div className="userImage">
      <Avatar 
        src={userImages || authState.userPicture}
        />
        <label> 
          <input
          type="file" 
          multiple 
          onChange={handleImageUpload} accept="image/*"/>
          <AddCircleOutlineRoundedIcon id="profileIcon"/>
        </label>
      </div>
      <button
      className="border-radius-50 font-color-white"
      style={{
        width: "200px",
        height: "40px",
        background: "linear-gradient(0deg,#87168b,#005eff)",
        border: "0px solid",
        fontSize: "16px",
        display: `${displayOfInstallButton.current}`}}
        onClick={()=>{
          installPrompt(deferredPrompt, displayOfInstallButton)}}>Instalar App</button>
      <div 
      className="t-a-s" 
      style={{margin: "40px 0", alignSelf: "flex-start"}}>
        <h3 onClick={()=>{setOpenUpdateModal(true)}}> Editar Detalles <EditIcon/></h3>
        <hr style={{ background: "linear-gradient(45deg, #00f1f8, #c300ff)", height: "1px", border: 0 }}/>
        <h4> Nombre: {authState.username} </h4>
        <h4> Email: {authState.email} </h4>
        <h4> Provincia Actual: {authState.actualProvince} </h4>
        <h4> Gustos Musicales:  {authState.musicalTastes} </h4>
      </div>
      {authState.isOwner&& <Link style={{color: "white",
                                         background: "#2f3133",
                                         padding: "10px",
                                         borderRadius: "15px",
                                         marginRight: "auto",
                                         marginBottom: "30px"}}
     to={`/profilePostsAdmin/${authState._id}`}>Gestionar Publicaciones</Link>}
      <div style={{width:"100%"}}>
        <h3>Suscripciones</h3>
        <hr style={{ background: "linear-gradient(45deg, #00f1f8, #c300ff)", height: "1px", border: 0 }}/>
        {authState.subscriptions?.map((service,key)=>
          (<Link className="font-color-white" to={`/service/${service._id}`}><div 
          style={{background: "#2F3133", padding:"10px", marginTop: "15px"}} 
          className="d-f a-i-c border-radius-50 j-c-s-b" key={key}>
            <h4>{service.type} {service.name}</h4>
            <UnsubscribeButton
              setAuthState={setAuthState} serviceId={service._id} fontSize={"16px"}
            />
          </div>
          </Link>)
        )}
      </div>
      <Dialog
        open={isLoading}
        scroll="paper"
      >
      <p className="loading-spinner"></p>
    </Dialog>

    <Dialog sx={{maxWidth: "100%"}} open={openUpdateModal} onClose={()=>{setOpenUpdateModal(false)}}>
             <form
             onSubmit={changeAuthState} 
             id="openUpdateModal" 
             className="j-c-f-e d-f f-d-c font-color-white"
             style={{background: "#232932", padding: "15px 20px", borderRadius: "10px"}}>
              <h3 style={{marginLeft: "10px"}}>Editar Detalles</h3>
              <p style={{marginBottom: "15px", marginLeft: "10px"}}>Deje en blanco lo que <br/>no quiera editar</p>
                <TextField 
                  style={{marginRight: "8px", color:"white"}}
                  label='Nombre del Usuario'
                  name='username' 
                  type="text" 
                  value={updateFormValues.username} 
                  onChange={handleUpdateFormValues("username")}
                  color="primary"
                  variant="standard"
                  className="inputs-changer font-size-20 font-color-white margin-top-5vh"
                />
                <TextField 
                  style={{marginRight: "8px", color:"white"}}
                  label='Email'
                  name='email' 
                  type="email" 
                  value={updateFormValues.email} 
                  onChange={handleUpdateFormValues("email")}
                  color="primary"
                  variant="standard"
                  className="inputs-changer font-size-20 font-color-white margin-top-5vh"
                />
          <FormControl variant="standard" sx={{ m: 1, width: "95%",minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Preferencia Músical</InputLabel>
          <Select 
          id="selectButton"
          label='Preferencia Músical'
          name='musicalTastes'
          value={updateFormValues.musicalTastes}
          onChange={handleUpdateFormValues("musicalTastes")}
          className="inputs-changer font-size-20 font-color-white box-shadow"
          color="primary"
          style={{color: "white"}}
          defaultValue={""}
          >
          {typeOfMusicPlayed.map((e, key)=>
          <MenuItem key={key} value={e}>{e}</MenuItem>
            )}
        </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1,width: "95%", minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Provincia</InputLabel>
        <Select 
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
          label='Provincia'
          name='actualProvince'
          value={updateFormValues.actualProvince}
          onChange={handleUpdateFormValues("actualProvince")}
          className="font-color-white box-shadow"
          color="primary"
          style={{color: "white"}}
          >{
            provinceAndTownships.map((e, key) => 
             <MenuItem key={key} value={e.province}>{e.province}</MenuItem>
            )}
          </Select>
          </FormControl>
              <hr/>
              <div className="d-f" id="openUpdateModalButtons">
              <button 
              type="button"
              onClick={()=>{setOpenUpdateModal(false)}}
              className="font-color-white" style={{background: "gray"}}>Cancelar</button>
              <button 
              type="submit"
              className="font-color-white" style={{background: "#115b63 "}}>Guardar</button>
              </div>
            </form>
    </Dialog>
    </div>
    
    
  );
}

export default Profile;