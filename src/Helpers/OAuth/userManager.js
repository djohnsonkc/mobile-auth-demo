import { defaults } from 'lodash';
import { UserManager } from 'oidc-client-ts';

// let defaultSettings = {
//     authority: process.env.REACT_APP_OAUTH_AUTHORITY,
//     client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
//     redirect_uri: process.env.REACT_APP_OAUTH_CALLBACK_URI,
//     response_type: 'code',
//     scope: process.env.REACT_APP_OAUTH_SCOPE,
//     post_logout_redirect_uri: process.env.REACT_APP_OAUTH_POST_LOGOUT_REDIRECT_URI
// }

// localhost uses dev (HEADS UP: must be on VPN for dev)
let defaultSettings = {
    authority: 'https://iam.rosnetqa.com',
    client_id: 'mobile.RosApp.Rosnet',
    redirect_uri:  'http://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid profile ROS.MS.SalesService',
    post_logout_redirect_uri: 'http://localhost:3000/logout-callback',
    automaticSilentRenew: false, // Prevent silent renew after logout
    revokeAccessTokenOnSignout: true, // Revoke tokens during logout
}

// Heroku uses QA
if (window.location.host.includes("herokuapp.com")) {
    defaultSettings = {
        authority: 'https://iam.rosnetqa.com',
        client_id: 'mobile.RosApp.Rosnet',
        redirect_uri: 'https://mobile-auth-demo-0cca0203e2fb.herokuapp.com/callback',
        response_type: 'code',
        scope: 'openid profile ROS.MS.SalesService',
        post_logout_redirect_uri: 'https://mobile-auth-demo-0cca0203e2fb.herokuapp.com/logout-callback',
        automaticSilentRenew: false, // Prevent silent renew after logout
        revokeAccessTokenOnSignout: true, // Revoke tokens during logout
    }
}

console.log("userManager", JSON.stringify(defaultSettings, null, 2))

const userManager = new UserManager(defaultSettings);

userManager.events.addAccessTokenExpiring(() => {
    console.log('Access token is about to expire. Refreshing...');
    userManager.signinSilent()
        .then(user => {
            console.log('Token refreshed successfully:', user.access_token);
        })
        .catch(error => {
            console.error('Failed to refresh token:', error);
        });
});

userManager.events.addAccessTokenExpired(() => {
    console.log('Access token has expired.');
});


export { userManager };
