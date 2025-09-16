import React,{useState, useContext} from 'react'
import axios from "axios";
import getEnvironment from '../../config/environment';
//import { useHistory } from 'react-router';
import {useParams} from 'react-router-dom'
import { TextField } from "@mui/material";
import { AuthContext } from '../../helpers/AuthContext';

function SendEmailToChangePassword() {
    const [email, setEmail] = useState("demo@perxins.com");
    const [error, setError ] = useState(false);
    const [changeView, setChangeView] = useState(false)
    //let history = useHistory();
    const params = useParams();
    const paramsId = params.id;

    const {setOpenLoadingBackdrop} = useContext(AuthContext)

    const sendEmail = async (e) => {
      e.preventDefault()
      setError(false)
      setOpenLoadingBackdrop(true)
      const env = getEnvironment();
      const data = { email };
      if (env.isDemo) {
        // Simulate email sending in demo mode
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
        setOpenLoadingBackdrop(false)
        setChangeView(true)
        return;
      }
      // Real API for non-demo
      axios.post("http://localhost:3001/user/sendEmailToChangePassword", data,
      {headers: {'Authorization': 'Bearer '+ paramsId}})
      .then(() => {
        setOpenLoadingBackdrop(false)
        setChangeView(true)
      })
      .catch(()=> {
        setOpenLoadingBackdrop(false)
        setError(true)})
    };
    return (
      <>
        {error && <p className="errorMessage">Algo ha salido mal</p>}
        {changeView && <p className="successMessage">Revise su correo</p>}
        <form onSubmit={sendEmail} id="authContainer">
          <p className='font-color-white font-size-20 m-l-10 m-r-10 margin-bottom-5vh'>Escriba su correo para mandarle las instrucciones de lo que debe hacer</p>
          <TextField
          required
            value={email}
            label="Email"
            type="email"
            //color="primary"
            variant="standard"
            className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh border-blue"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button
            className="b-button font-color-white border-0 h-45px inputs-shape box-shadow margin-top-5vh font-size-25 margin-top-3vh"
          > Mandar Correo </button>
          <button
          className="b-button font-color-white border-0 h-45px inputs-shape box-shadow margin-top-5vh font-size-25 margin-top-3vh"
          onClick={()=>{window.open('https://mail.google.com/mail/u/0/', '_blank')}}>
          Ir a Gmail
          </button>
    </form>
        
      </>
    );
  }

export default SendEmailToChangePassword
