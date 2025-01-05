
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userManager from '../../Helpers/OAuth/userManager';
import "./Styles.css";

const Landing = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null)

  useEffect(() => {

    // const searchParams = new URLSearchParams(window.location.search);
    // const stay = searchParams.get('stay');

    // if (!stay) {
    //   setTimeout(() => {
    //     navigate('/home')
    //   }, 500);
    // }

    document.title = 'Home | PowerCenter';

    async function getUser() {
      const user = await userManager.getUser();
      console.log("user", user)
      if (user && user.access_token) {
        setUserData(user)
      }
    }
    getUser()


  }, []);

  return (
    <div className="container-fluid loading d-flex justify-content-center align-items-center vh-100">

      <div className="device-container">

        <div className="device-header">
          <div className="icon">
            <img src="rosnet-icon.svg" alt="Left Icon" />
          </div>
          <div className="title">
            Mobile App
          </div>
          <div className="hamburger">
            <img src="hamburger.png" alt="Menu" />
          </div>
        </div>

        <div className="device-content">
          <div className="content">
            {!userData && (
              <>
                <h4 className="mt-3">Sign in to continue.</h4>

              </>
            )}
            {userData && (
              <>
                <img src="avatar.png" alt="Avatar" />
                <h4 className="mt-3">Welcome, {userData.profile.name}</h4>
              </>
            )}
          </div>
        </div>


        <div className="device-footer">
          <div className="d-flex justify-content-center text-center align-items-center w-100">
            {!userData && (

              <button type="button" className="btn btn-outline-light" onClick={() => userManager.signinRedirect()}>
                Sign In Now
              </button>

            )}
            {userData && (
              <a href="/logout" className="btn btn-outline-light">
                Sign Out
              </a>

            )}
          </div>
        </div>

      </div>


    </div>



  );
}

export default Landing;
