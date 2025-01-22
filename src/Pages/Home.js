
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from '../Helpers/OAuth/userManager';
import apiHelper from '../Helpers/OAuth/apiHelper';
import CountdownTimer from "../Components/CountdownTimer";
// import { Lock, AtSign, Search, MessageCircle, User, Bell, ChevronRight, Briefcase, Calendar, BarChart2 } from "react-feather";
import * as FeatherIcons from 'react-feather';
import sampleNotifications from '../Fixtures/Sample-Notifications.json'
import "./Styles.css";

const Home = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const searchParams = new URLSearchParams(window.location.search);
    const showAnyway = searchParams.get('showAnyway');

    document.title = 'RosApp';

    async function getUser() {
      const user = await userManager.getUser();
      console.log("user", user)
      if (user && user.access_token) {
        setUserData(user)
      }
      else {
        // userManager.signinRedirect()

        if(showAnyway) {
          setUserData({ access_token: "faked" })
        }
        else {
          navigate('/')
        }

      }
    }
    getUser()


  }, []);

  const DynamicIcon = ({ iconName, size = 24, color = 'black' }) => {
    // Check if the icon exists in the FeatherIcons object
    const IconComponent = FeatherIcons[iconName];
  
    // If the icon exists, render it; otherwise, show a fallback
    return IconComponent ? (
      <IconComponent size={size} color={color} />
    ) : (
      <div>Icon not found</div>
    );
  };

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
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">

      <div className="device-container">

        <div className="device-header">
          <div className="icon">
            <img src="rosnet-icon.svg" alt="Left Icon" />
          </div>
          <div className="title">
            Notifications
          </div>
          <div className="hamburger">

            <div className="dropdown">
              {/* <button className="btn btn-link dropdown-toggle no-caret no-focus" type="button" id="hamburgerMenu" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="hamburger.png" alt="Menu" />
              </button> */}
              <button className="btn btn-link dropdown-toggle no-caret no-focus" type="button" id="hamburgerMenu" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <img src="hamburger.png" alt="Menu" />
              </button>

            </div>
          </div>
        </div>

        <div className="device-body">
          <div className="content">
            {userData &&
              <>
                <div className="d-flex flex-column align-items-center">
                  <div className="w-100">

                    {sampleNotifications.map((notif, index) => {
                      return (
                        <div
                          key={index}
                          className="list-item hover-effect-with-pointer mb-1"
                        // onClick={() => navigate('/admin/assign-share-list')}
                        >
                          <div className="d-flex flex-row align-items-center gap-2">
                            <div className="avatar align-self-start">
                              <div
                                className="d-flex justify-content-center align-items-center rounded-circle"
                                style={{ width: 40, height: 40, backgroundColor: '#004B87' }}
                              >
                                <DynamicIcon iconName={notif.icon || "Bell"} size={20} color={'white'} />
                              </div>
                            </div>
                            <div className="flex-grow-1 title-container">
                              <div className="title no-select mb-1">{notif.title}</div>
                              <div className="description mb-0 no-select">
                                {notif.description}
                              </div>
                            </div>
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{ height: '40px' }} // Ensure alignment with avatar
                            >
                              <DynamicIcon iconName="ChevronRight" size={20} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            }
          </div>

          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
            // data-bs-backdrop="false"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              maxWidth: '90%', // Adjust as needed
              width: '300px',
              overflowY: 'auto',
            }}
          >
            <div className="offcanvas-header">
              {/* <h5 className="offcanvas-title" id="offcanvasExampleLabel">RosApp Menu</h5> */}
              <img src="rosnet-logo.png" alt="Logo" style={{ marginTop: 10, maxWidth: 200 }} />
              <button
                type="button"
                className="btn-close btn-close-white text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">

              
              <ul className="list-unstyled text-white">
                <li className="mb-2">
                  <a
                    href="#action1"
                    data-bs-toggle="modal"
                    data-bs-target="#settingsModal"
                    className="text-white text-decoration-none"
                  >
                    Identity Provider Settings
                  </a>
                </li>
                <li>
                  <a href="/logout" className="text-white text-decoration-none">
                    Logout
                  </a>
                </li>
              </ul>

            </div>
          </div>
        </div>

        <div className="device-footer">
          <div className="d-flex justify-content-between text-center align-items-center w-100">

            <div className="footer-item selected">
              <div className="icon-wrapper">
              <DynamicIcon iconName="Bell" color="white" size={24} />
              </div>
              <p className="footer-label">Notifications</p>
            </div>
            <div className="footer-item">
              <div className="icon-wrapper">
              <DynamicIcon iconName="BarChart2"  color="white" size={24} />
              </div>
              <p className="footer-label">Dashboards</p>
            </div>
            <div className="footer-item">
              <div className="icon-wrapper">
              <DynamicIcon iconName="MessageCircle"  color="white" size={24} />
              </div>
              <p className="footer-label">Chat</p>
            </div>
            <div className="footer-item">
              <div className="icon-wrapper">
              <DynamicIcon iconName="User" color="white" size={24} />
              </div>
              <p className="footer-label">Profile</p>
            </div>
          </div>
        </div>
      </div>


      <div className="modal" id="settingsModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Identity Provider Settings</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>This is where you could use your own Identity Provider Settings....</p>

              <textarea rows="10" className="w-100 b-none" value={getJson()}>
              </textarea>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary text-uppercase" data-bs-dismiss="modal">CLOSE</button>
              <button type="button" className="btn btn-primary text-uppercase" id="saveSettingsButton" data-bs-dismiss="modal">SAVE</button>
            </div>
          </div>
        </div>
      </div>






    </div>



  );
}

export default Home;
