
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
        // setTimeout(() => {
        //   userManager.signinRedirect()
        // },1000)
      }
    }
    getUser()


  }, []);


  function redirectToAuthProvider() {
    userManager.signinRedirect()
  }


  return (



    <div className="container-fluid loading d-flex justify-content-center align-items-center vh-100">
      <div className="device-container">
        <div className="device-header"></div>

        <div className="device-body primary d-flex justify-content-center align-items-center">
          <div className="content text-center">
            <img
              src="rosnet-logo.png"
              alt="Logo"
              style={{ marginTop: 10, maxWidth: 300 }}
            />
          </div>
        </div>

        <div className="device-footer">
          <div className="d-flex justify-content-center text-center align-items-center w-100">
            <button type="button" onClick={() => redirectToAuthProvider()} className="btn btn-primary-outline" style={{
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid white",
              padding: "10px 20px",
              borderRadius: 20
            }}>
              Login Now
            </button>
          </div>
        </div>
      </div>
    </div>













  );
}

export default Landing;
