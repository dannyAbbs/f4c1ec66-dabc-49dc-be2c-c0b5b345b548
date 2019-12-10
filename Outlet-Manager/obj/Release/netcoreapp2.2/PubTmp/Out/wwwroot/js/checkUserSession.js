let loginData = {};

//try {
//    loginData = JSON.parse(localStorage.getItem("loginData"));
//} catch (e) {
//    window.location = 'landingpage';
//}

if (!loginData)
    window.location = 'landingpage';
