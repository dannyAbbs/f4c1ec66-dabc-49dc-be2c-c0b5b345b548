let IDPURL = `${window.location.origin}/`;
let omsBaseURI = `http://95.179.229.183/OMSIDS/`,
    omsAPI = `http://95.179.229.183/OMSAPI/api/`;

//let omsBaseURI = `http://psl-app-vm3/OMSIDS/`;
//let omsAPI = `http://psl-app-vm3/OMSAPI/api/`;

var config = {
    authority: omsBaseURI,
    client_id: "omsimplicit",
    redirect_uri: IDPURL + "forward",
    post_logout_redirect_uri: IDPURL + "LandingPage",
    acr_values: 1,
    // these two will be done dynamically from the buttons clicked, but are
    // needed if you want to use the silent_renew
    response_type: "id_token token",
    scope: "openid profile email omsyapi",

    // this will toggle if profile endpoint is used
    loadUserInfo: true,

    // silent renew will get a new access_token via an iframe 
    // just prior to the old access_token expiring (60 seconds prior)
    silent_redirect_uri: IDPURL + "/silent",
    automaticSilentRenew: true,

    // will revoke (reference) access tokens at logout time
    revokeAccessTokenOnSignout: true,

    // this will allow all the OIDC protocol claims to be visible in the window. normally a client app 
    // wouldn't care about them or want them taking up space
    filterProtocolClaims: false
};
var mgr = new Oidc.UserManager(config), user, userDetails;



mgr.getUser().then(function (user) {
    if (user) {
        UserAccess = user;
    }
    else {
        console.log("User not logged in at signin page");
    }
});


function login() {
    mgr.signinRedirect();
}


function logout() {
    mgr.signoutRedirect();
}