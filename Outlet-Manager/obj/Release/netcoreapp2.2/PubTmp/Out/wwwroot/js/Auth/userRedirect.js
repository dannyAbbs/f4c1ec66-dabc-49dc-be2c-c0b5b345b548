let loginData = {};
loginData = JSON.parse(localStorage.getItem("loginData"));

if (!loginData)
    window.location = `${window.location.href}/landingpage`;