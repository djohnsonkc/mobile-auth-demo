import { defaults } from 'lodash';
import { UserManager } from 'oidc-client-ts';

// const userManager = new UserManager({
//     authority: process.env.REACT_APP_OAUTH_AUTHORITY, //'https://iam.rosnetqa.com',
//     client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
//     redirect_uri: process.env.REACT_APP_OAUTH_CALLBACK_URI, //'http://localhost:3000/callback',
//     response_type: 'code',
//     scope: process.env.REACT_APP_OAUTH_SCOPE,
//     post_logout_redirect_uri: process.env.REACT_APP_OAUTH_POST_LOGOUT_REDIRECT_URI //'http://localhost:3000',
// });

let defaultSettings = {
    authority: 'https://dev-rxr5aoysvin02xuq.us.auth0.com',
    client_id: 'kqk5k5gQsqsR4kUsNImMQPgSVHiIUyb1',
    redirect_uri:  'http://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid profile',
    audience: 'mobile-auth-demo-custom-api',
    post_logout_redirect_uri: 'http://localhost:3000/logout-callback',
}
console.log("host", window.location.host)
if(window.location.host.includes("herokuapp.com")) {
    defaultSettings = {
        authority: 'https://dev-rxr5aoysvin02xuq.us.auth0.com',
        client_id: 'kqk5k5gQsqsR4kUsNImMQPgSVHiIUyb1',
        redirect_uri:  'https://mobile-auth-demo-0cca0203e2fb.herokuapp.com/callback',
        response_type: 'code',
        scope: 'openid profile',
        audience: 'mobile-auth-demo-custom-api',
        post_logout_redirect_uri: 'https://mobile-auth-demo-0cca0203e2fb.herokuapp.com/logout-callback',
    }
}

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
