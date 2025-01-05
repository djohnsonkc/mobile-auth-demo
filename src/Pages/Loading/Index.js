
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import "./Styles.css";

const Loading = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const searchParams = new URLSearchParams(window.location.search);
    const stay = searchParams.get('stay');

    if(!stay) {
      setTimeout(() => {
        navigate('/landing')
      }, 500);
    }

    document.title = 'Loading | PowerCenter';

  }, []);

  return (
    <div className="container-fluid loading">


      <div className="ph-wrapper">

        {/* Top Nav */}
        <div className="ph-topnav ph-animated">
          <div className="ph-logo left"></div>
          <div className="right">
            <div className="ph-link"></div>
            <div className="ph-link"></div>
            <div className="ph-link"></div>
            <div className="ph-link"></div>
            <div className="ph-link"></div>
          </div>
        </div>


        <div className="d-flex gap-3 mx-3">
          <div className="ph-cta ph-animated">
            <div className="ph-icon"></div>
          </div>
          <div className="ph-cta ph-animated">
            <div className="ph-icon"></div>
          </div>          
          <div className="ph-cta ph-animated">
            <div className="ph-icon"></div>
          </div>
          <div className="ph-cta ph-animated">
            <div className="ph-icon"></div>
          </div>
          <div className="ph-cta ph-animated">
            <div className="ph-icon"></div>
          </div>
          <div className="ph-cta ph-animated">
            <div className="ph-icon"></div>
          </div>
        </div>


      </div>


    </div>
  );
}

export default Loading;
