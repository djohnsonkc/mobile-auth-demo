import { UserManager } from 'oidc-client-ts';

const userManager = new UserManager({
    authority: process.env.REACT_APP_OAUTH_AUTHORITY, //'https://iam.rosnetqa.com',
    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_OAUTH_CALLBACK_URI, //'http://localhost:3000/callback',
    response_type: 'code',
    scope: process.env.REACT_APP_OAUTH_SCOPE,
    post_logout_redirect_uri: process.env.REACT_APP_OAUTH_POST_LOGOUT_REDIRECT_URI //'http://localhost:3000',
});

//console.log("userManager", userManager)

export default userManager;
