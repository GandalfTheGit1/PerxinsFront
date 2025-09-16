import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../helpers/AuthContext";
import createService from "../../services/factory";
import "./Auth.css";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PerxinsLogo from "../../common/Logo/PerxinsLogo";
import { TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import TopProgressBar from "../../Animations/TopProgressBar";
//import TextField from "../../Components/formComponents/TextField";
import { getSubscription } from "../../helpers/notifyMe";
import GoogleLoginButton from "./GoogleLoginButton";

function Login() {
  const [email, setEmail] = useState("demo@perxins.com");
  const [password, setPassword] = useState("demo123");
  const [role, setRole] = useState('client');
  const { setAuthState, setOpenLoadingBackdrop } = useContext(AuthContext);
  const [error, setError ] = useState(false);
  const [progressBarState, setProgressBarState] = useState(0)
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false)

  const login = async (e) => {
    e.preventDefault();
    setOpenLoadingBackdrop(true);
    setError(false); // Reset error on attempt

    const data = { email, password, role };
    const authService = createService('auth');
    try {
      const response = await authService.signin(data);
      const { accessToken, user, isNewUser } = response;
      setAuthState({
        ...user,
        id: user._id,
        userId: user._id,
        status: true
      });

      setProgressBarState(100);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", user._id);
      const redirectPath = isNewUser ? "/presentation" : "/";
      history.push(redirectPath);
      getSubscription();
      setOpenLoadingBackdrop(false);
    } catch (error) {
      setOpenLoadingBackdrop(false);
      setProgressBarState(0);
      setError(true);
    }
  };
    const handleClickShowPassword = () => {
      setShowPassword(prevState => !prevState)
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
 
  return (
    <TopProgressBar
    progressBarState={progressBarState}
    >
    <form 
    style={{overflowX: "hidden"}} autoComplete="off" id="authContainer" className="" 
    onSubmit={login}>
      {error && <p className="errorMessage">No está autorizado</p>}

      <PerxinsLogo
      logoFill={1.8}
      delayBetweenLettersAnimation={0.2}
      lettersAnimation={0.6}

      />
      <h2 >
        <span>P</span>
        <span>E</span>
        <span>R</span>
        <span>X</span>
        <span>I</span>
        <span>N</span>
        <span>S</span>
    </h2>
      <h3 className="subHeader font-size-25">Iniciar Sesión</h3>
      <TextField
      sx={{ m: 1, width: '85vw' }}
      required
      autoComplete="off"
        label="Email"
        value={email}
        type="email"
        //color="primary"
        variant="standard"
        className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh border-blue"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        
      />
      <FormControl className="border-blue inputs-changer" sx={{ m: 1, width: '85vw' }} variant="standard">
        <InputLabel id="demo-role-label">Tipo de Usuario</InputLabel>
        <Select
          labelId="demo-role-label"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Tipo de Usuario"
          className="font-size-25 font-color-white inputs-shape margin-top-2vh"
        >
          <MenuItem value="client">Cliente</MenuItem>
          <MenuItem value="owner">Dueño</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="border-blue inputs-changer" sx={{ m: 1, width: '85vw' }} variant="standard">
      <InputLabel htmlFor="filled-adornment-password" id="font-color-white">Contraseña</InputLabel>
      <Input
       required
        value={password}
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
        //color="primary"
        variant="standard"
        className="border-blue font-size-25 font-color-white inputs-shape"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      </FormControl>
      <Link to='/SendEmailToChangePassword'>¿Se olvidó de su contraseña?</Link>
      <button
      type="submit"
      className="b-button font-color-white border-0 h-45px inputs-shape box-shadow margin-top-5vh font-size-25 margin-top-3vh"
        > Iniciar Sesión </button>
      <GoogleLoginButton
      setError={setError}
      />
    </form>
    </TopProgressBar>
    
  );
}

export default Login;
