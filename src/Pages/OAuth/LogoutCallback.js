import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LogoutCallback = () => {

  const navigate = useNavigate();

  useEffect(() => {

    document.title = 'Logged Out | PowerCenter';

    setTimeout(() => {
      navigate('/')
    }, 1);


  }, []);

  return (
    <div className="container-fluid loading">


      <div className="row justify-content-md-center mb-5 pt-3">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">



          <p>You have been logged out.</p>
          <a href="/sign-in-redirect" className="btn btn-outline-white">Sign In Now</a>






        </div>
      </div>


    </div>
  );

};

export default LogoutCallback;