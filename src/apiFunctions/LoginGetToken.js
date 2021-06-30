import axios from 'axios';


export default async function LoginGetToken(details) {
    //Sends email and password that was entered to the api, if correct the api sends a token back, token is stored in App.js

    let jwtToken = "";
    let err = null;

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    try {
        const { data } = await axios.post(`${BACKEND_URL}/auth/local`, { //send login info to the api
            identifier: details.email,
            password: details.password,
        });
        console.log("%c Login successful", "color: green; font-weight: bold");
        jwtToken = data.jwt;  //if successful store jwt token for return and local storage
        localStorage.setItem("jwtToken", jwtToken);
    } catch (error) {
        console.error("%c Login details are wrong: ", "color: yellow; font-weight: bold", error);
        err = error;
        localStorage.clear(); //As a safety precaution if user somehow has something in local storage
    }

    return ({ //return object to use in App
        token: jwtToken,
        error: err,
    });

}

