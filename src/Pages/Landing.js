
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from '../Helpers/OAuth/userManager';
import apiHelper from '../Helpers/OAuth/apiHelper';
import CountdownTimer from "../Components/CountdownTimer";
import { Lock, AtSign } from "react-feather";
import "./Styles.css";

const Landing = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null)

  useEffect(() => {

    document.title = 'RosApp';

    async function getUser() {
      const user = await userManager.getUser();
      console.log("user", user)
      if (user && user.access_token) {
        setUserData(user)
        navigate('/home')
      }
      else {
        setTimeout(() => {
          userManager.signinRedirect()
        },1000)
      }
    }
    getUser()


  }, []);



  async function onCountdownFinish() {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const user = await userManager.getUser();
    if (user && user.expires_at) {

      //return user.expires_at > currentTime; // Token is valid if expiration time is in the future
    }
    console.log("user still active after countdown?", user, "expired?", user.expires_at > currentTime)
  }

  function getJson() {
    const settings = {
      authority: 'https://dev-k1j3j4k3.us.auth0.com',
      client_id: 'jakdjfakjiejadkfjakdjfakjdfk',
      redirect_uri: 'http://localhost:3000/callback',
      response_type: 'code',
      scope: 'openid profile',
      audience: 'mobile-auth-demo-custom-api',
      post_logout_redirect_uri: 'http://localhost:3000/logout-callback'
    }

    return JSON.stringify(settings, null, 2)
  }

  return (
    <div className="container-fluid loading d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#004B87" }}>

      <div className="device-content">
        <div className="content">

          <img src="rosnet-icon-400.svg" height="200" width="200" alt="Rosnet Logo" />

        </div>
      </div>

    </div>



  );
}

export default Landing;
