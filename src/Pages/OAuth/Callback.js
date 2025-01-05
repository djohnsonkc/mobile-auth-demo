import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userManager from '../../Helpers/OAuth/userManager';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Handle the callback and exchange the code for tokens
                const user = await userManager.signinCallback();
                console.log('User logged in:', user);

                // Redirect to the app's main page or a secured area
                navigate('/');
            } catch (error) {
                console.error('Error handling callback:', error);
                //navigate('/error'); // Redirect to an error page if needed
                alert(error)
            }
        };

        handleCallback();
    }, [navigate]);

    return <div>Loading...</div>; // Show a loading message while processing
};

export default Callback;
