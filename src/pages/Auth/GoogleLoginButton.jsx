import React, {useContext} from 'react'
import GoogleLogin from 'react-google-login';
import {getSubscription} from "../../helpers/notifyMe"
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";

function GoogleLoginButton({setError}) {

  const history = useHistory();
  const { setAuthState, setOpenLoadingBackdrop } = useContext(AuthContext);

  return (
    <GoogleLogin
            clientId="817378467594-gtmls3s1qe9896q1gj93begc7hqi995f.apps.googleusercontent.com"
            render={renderProps => (
              
              <button 
              className="border-0 font-color-white b-button h-45px inputs-shape box-shadow margin-top-5vh font-size-25 margin-top-3vh"
              onClick={(es)=>{
                setOpenLoadingBackdrop(true)
                renderProps.onClick(es)
              }}
              disabled={renderProps.disabled}
              >Acceder con Google</button>
            )}
            onSuccess={(responseGoogle)=>{
              
              axios.post("http://localhost:3001/user/googleSign", responseGoogle.profileObj)
              .then((response)=> {
                
                const { accessToken, user, isNewUser }= response.data;
                setAuthState({
                  ...user,
                  id : user._id,
                  status: true
                })


                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("userId", user._id);

                getSubscription()
                isNewUser
                ?
                history.push("/presentation")
                :
                history.push("/")
                setOpenLoadingBackdrop(false)
              })
              .catch(()=>{
                setOpenLoadingBackdrop(false)
              })
            }}
            onFailure={(responseGoogle)=>{setError(true)}}
            cookiePolicy={'single_host_origin'}
          />
  )

}

export default GoogleLoginButton