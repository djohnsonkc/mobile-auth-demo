import { UserManager } from 'oidc-client-ts';

let defaultSettings = {
    authority: 'https://dev-rxr5aoysvin02xuq.us.auth0.com',
    client_id: 'kqk5k5gQsqsR4kUsNImMQPgSVHiIUyb1',
    redirect_uri:  'http://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid profile',
    post_logout_redirect_uri: 'http://localhost:3000/logout-callback',
}
console.log("host", window.location.host)
if(window.location.host.includes("rosuidev")) {
    defaultSettings = {
        authority: 'https://dev-rxr5aoysvin02xuq.us.auth0.com',
        client_id: 'kqk5k5gQsqsR4kUsNImMQPgSVHiIUyb1',
        redirect_uri:  'https://www.rosui.dev/callback',
        response_type: 'code',
        scope: 'openid profile',
        post_logout_redirect_uri: 'https://www.rosui.dev/logout-callback',
    }
}

// const userManager = new UserManager({
//     authority: process.env.REACT_APP_OAUTH_AUTHORITY, //'https://iam.rosnetqa.com',
//     client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
//     redirect_uri: process.env.REACT_APP_OAUTH_CALLBACK_URI, //'http://localhost:3000/callback',
//     response_type: 'code',
//     scope: process.env.REACT_APP_OAUTH_SCOPE,
//     post_logout_redirect_uri: process.env.REACT_APP_OAUTH_POST_LOGOUT_REDIRECT_URI //'http://localhost:3000',
// });

const userManager = new UserManager(defaultSettings);

//console.log("userManager", userManager)

export default userManager;
