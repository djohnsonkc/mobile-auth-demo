import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userManager } from '../../Helpers/OAuth/userManager';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Handle the callback and exchange the code for tokens
                await userManager.signoutRedirect();
                console.log('User logged out and redirected.');

            } catch (error) {
                console.error('Error handling callback:', error);
                //navigate('/error'); // Redirect to an error page if needed
                alert(error)
            }
        };

        handleCallback();
    }, [navigate]);

    return <div>Logging you out...</div>; // Show a loading message while processing
};

export default Logout;
