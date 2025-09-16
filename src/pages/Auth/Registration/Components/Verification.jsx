import React, {useState, useContext} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {TextField} from '@mui/material'
import { AuthContext } from "../../../../helpers/AuthContext";
import TopProgressBar from "../../../../Animations/TopProgressBar.jsx";
import {getSubscription} from "../../../../helpers/notifyMe"
import Arrow from "../../../../SVG/ArrowLeft"

function Verification({formValues, setFormValues,setChangeOfPage}) {
  const history = useHistory();

  const {setOpenLoadingBackdrop} = useContext(AuthContext)
  const [error, setError] = useState(false)
  const { setAuthState } = useContext(AuthContext);
  const [emailIsSend, setEmailIsSend] = useState(false)

  const onSubmit = (e) => {
    setOpenLoadingBackdrop(true)
    e.preventDefault()
    
    if(formValues.verificationCode!==""){
    axios.post("http://localhost:3001/user/verification", formValues)
    .then((response) => {
      setOpenLoadingBackdrop(true)
      const { accessToken, error, user, _id} = response.data;
      if (error) {
        alert(error);
      } else {
        localStorage.setItem("accessToken", accessToken);
        setAuthState({
            ...user,
            id: _id,
            userId: _id, 
            status: true,
        });
        setOpenLoadingBackdrop(false)
        getSubscription()
        history.push("/presentation")
    }})
    .catch(e=>{
      setOpenLoadingBackdrop(false)
    setError(true)
  })
  } else {
    setOpenLoadingBackdrop(true)
    axios.post("http://localhost:3001/user/resendEmail", formValues)
    .then(()=>{
      setEmailIsSend(true)
      setOpenLoadingBackdrop(false)
    })
    .catch((e)=>{
      setOpenLoadingBackdrop(false)
      setError(true)})
  }
    setOpenLoadingBackdrop(false)
  };
  const handleChange = input => e =>{
    setFormValues({...formValues,[input]: e.target.value})
}

  return (
    <TopProgressBar
    //progressBarState={progressBarState}
    >
       <div>
        <p 
        onClick={()=> setChangeOfPage(true)}
        className="p-a" 
        style={{
          top: "82px",
          left: "9vw",
        }}><Arrow/></p>
        <form onSubmit={onSubmit} id="authContainer">
        {error&&<p className="errorMessage">Algo ha salido mal</p>}
        {emailIsSend && <p style={{background: "#3a2", padding: "5px 10px"}}>Correo enviado</p>}
          <p 
          style={{marginTop: "5vh"}}
          className="m-l-10 m-r-10 font-color-white font-size-25">Verifique su correo e introduzca el Código de Verificación</p>

          <TextField
            required
            label="Email"
            autoComplete="off"
            value={formValues.email}
            name="email"
            color="primary"
            variant="standard"
            className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh border-blue"
            onChange={handleChange("email")}
          />
          <TextField
            label="Código de Verificación"
            autoComplete="off"
            type="text"
            name="verificationCode"
            color="primary"
            variant="standard"
            className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh border-blue"
            placeholder="_ _ _ _"
            value={formValues.verificationCode}
            onChange={handleChange("verificationCode")}
          />

          <button
          type="submit"
          className="b-button font-color-white border-0 h-45px inputs-shape box-shadow margin-top-5vh font-size-25 margin-top-3vh"
          > Valida
          </button>

          <button
          type="submit"
          className="b-button font-color-white border-0 h-45px inputs-shape box-shadow margin-top-5vh font-size-25 margin-top-3vh"
          > Reenviar Correo
          </button>
          
        </form>
        </div>
        </TopProgressBar>
  );
}

export default Verification;
