


import React, { useEffect } from "react";
import userManager from '../../Helpers/OAuth/userManager';

const SignInRedirect = () => {


    useEffect(() => {


        document.title = 'Sign In Redirect | PowerCenter';

        userManager.signinRedirect(); // Initiates the authorization flow

    }, []);

    return <div>Loading...</div>; // Show a loading message while processing

}

export default SignInRedirect;




