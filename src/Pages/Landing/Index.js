
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from '../../Helpers/OAuth/userManager';
import apiHelper from '../../Helpers/OAuth/apiHelper';
import CountdownTimer from "../../Components/CountdownTimer";
import { Lock, AtSign } from "react-feather";
import "./Styles.css";

const Landing = () => {

  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

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

  async function getData(forcedValue) {

    setIsLoading(true)

    // IMPORTANT: Locally, I run the server on port 3100
    let url = "http://localhost:3100/api/fakeEndpoint";
    // when running at Heroku
    if (document.location.href.indexOf('localhost') === -1) {
      url = "/api/fakeEndpoint";
    }

    try {
      // uses axios interceptor to handle 401s by attempting to refresh the token and retry the request
      const response = await apiHelper.get(url, { page: 1 });

      // if there are dashboards for the user, default the first one to selected
      if (response.data && response.data.length > 0) {

        // use response.data

      }

      setIsLoading(false)

    }
    catch {
      console.log("error fetching data")
      setIsLoading(false)
    }


  }

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

            <div className="dropdown">
              <button className="btn btn-link dropdown-toggle no-caret no-focus" type="button" id="hamburgerMenu" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="hamburger.png" alt="Menu" />
              </button>

              <ul className="dropdown-menu" aria-labelledby="hamburgerMenu">
                <li><a className="dropdown-item" href="#action1" data-bs-toggle="modal" data-bs-target="#settingsModal">Identity Provider Settings</a></li>
                {/* <li><a className="dropdown-item" href="#action2">Action 2</a></li>
                <li><a className="dropdown-item" href="#action3">Action 3</a></li> */}
              </ul>
            </div>
          </div>
        </div>

        <div className="device-content">
          <div className="content">
            {!userData && (
              <>
                <h4 className="mt-3">Sign in to continue.</h4>

                <p>When redirected to the Identity Provider's login, use these credentials:</p>


                {/* <ul className="list-group">
                  <li className="list-group-item">Email: test@test.com</li>
                  <li className="list-group-item">Password: Testing123!</li>
                </ul> */}


                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping"><AtSign size={16} /></span>
                  <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" value="test@test.com" disabled />
                </div>
                <div className="input-group flex-nowrap mt-1">
                  <span className="input-group-text" id="addon-wrapping"><Lock size={16} /></span>
                  <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" value="Testing123!" disabled />
                </div>
              </>
            )}
            {userData && (
              <>
                <img src="avatar.png" alt="Avatar" />
                <h4 className="mt-3">Welcome, {userData.profile.name}</h4>

                <CountdownTimer start={12} seconds={1} onFinish={onCountdownFinish} />

                <button type="button" className="btn btn-link" onClick={() => getData("200")}>
                  Get Data
                </button>

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


      <div class="modal" id="settingsModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Identity Provider Settings</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>This is where you could use your own Identity Provider Settings....</p>

              <textarea rows="10" className="w-100 b-none" value={getJson()}>
              </textarea>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary text-uppercase" data-bs-dismiss="modal">CLOSE</button>
              <button type="button" class="btn btn-primary text-uppercase" id="saveSettingsButton" data-bs-dismiss="modal">SAVE</button>
            </div>
          </div>
        </div>
      </div>

    </div>



  );
}

export default Landing;
