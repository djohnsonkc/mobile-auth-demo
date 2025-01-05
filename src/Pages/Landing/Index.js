
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Styles.css";

const Landing = () => {

  const navigate = useNavigate();

  useEffect(() => {

    // const searchParams = new URLSearchParams(window.location.search);
    // const stay = searchParams.get('stay');

    // if (!stay) {
    //   setTimeout(() => {
    //     navigate('/home')
    //   }, 500);
    // }

    document.title = 'Home | PowerCenter';

  }, []);

  return (
    <div className="container-fluid loading">


      <div className="row justify-content-md-center mb-5 pt-3">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">




          <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="device-container d-flex justify-content-center align-items-center">
              <div className="content">
                <h3>Mobile Content</h3>
                <p>This container adapts to your viewport size.</p>
                <a href="/sign-in-redirect" className="btn btn-primary">Sign In</a>
              </div>
            </div>
          </div>


        </div>
      </div>


    </div>
  );
}

export default Landing;
