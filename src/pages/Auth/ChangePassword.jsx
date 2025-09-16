import React,{useState, useContext} from 'react'
import axios from "axios";

import { useHistory } from 'react-router-dom';

import { AuthContext } from "../../helpers/AuthContext";
import {useParams} from 'react-router-dom'

import IconButton from    '@mui/material/IconButton';
import FormControl from   '@mui/material/FormControl';
import FilledInput from   '@mui/material/FilledInput';
import InputLabel from    '@mui/material/InputLabel';
import Visibility from    '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

function ChangePassword() {
    const [passwordChange, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError ] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const { 
      setAuthState,
      setOpenLoadingBackdrop
     } = useContext(AuthContext);

    let history = useHistory();
    const params = useParams();
    const paramsId = params.id;


    const changePassword = (e) => {
      e.preventDefault()
      setOpenLoadingBackdrop(true)
      const data = { passwordChange, jwt:paramsId };
      axios.post("http://localhost:3001/user/changePassword", data)
      .then((response) => {
        const { error, accessToken, username, _id}= response.data;
        if (error) {
          alert(error);
        } else {
            localStorage.setItem("accessToken", accessToken);
            setAuthState({
              id: _id,
              username, 
              userId: _id, 
              status: true,
            });
        }
      }).then(() => {
          setOpenLoadingBackdrop(false)
          history.push("/service")
        })
        .catch(() => {
          setError(true)
          setOpenLoadingBackdrop(false)
        })
    };

    const handleClickShowPassword = () => {
      setShowPassword(prevState => !prevState)
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
      <form onSubmit={changePassword} id="authContainer">
        <h1>Perxins</h1>
        <h3 className="font-size-20 font-color-white">Cambiar Contraseña</h3>
        <FormControl sx={{ m: 1, width: '85vw' }} variant="standard">
      <InputLabel htmlFor="filled-adornment-password" id="font-color-white">Password</InputLabel>
      <FilledInput
       required
        value={passwordChange}
        type={showPassword?"text":"password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton

              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff className="font-color-white" /> : <Visibility className="font-color-white"/>}
            </IconButton>
          </InputAdornment>
        }
        color="primary"
        variant="standard"
        className="border-blue font-size-25 font-color-white inputs-shape"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      </FormControl>

      <FormControl sx={{ m: 1, width: '85vw' }} variant="standard">
      <InputLabel htmlFor="filled-adornment-password" id="font-color-white">Contraseña de Confirmación</InputLabel>
      <FilledInput
       required
        value={passwordConfirmation}
        type={showPassword?"text":"password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff className="font-color-white" /> : <Visibility className="font-color-white"/>}
            </IconButton>
          </InputAdornment>
        }
        color="primary"
        variant="standard"
        className="border-blue font-size-25 font-color-white inputs-shape"
        onChange={(event) => {
          event.target.value!==passwordChange
            ?setError(true)
            :setError(false)
          setPasswordConfirmation(event.target.value);
        }}
      />
      </FormControl>

        {error&& <p className=' font-color-white margin-top-3vh'>Las contraseñas no coinciden</p>}
        <button 
        type="submit"
        className="b-button font-color-white border-0 h-45px inputs-shape box-shadow margin-top-5vh font-size-25 margin-top-3vh"
          > Cambiar Contraseña </button>
      </form>
    );
  }

export default ChangePassword
