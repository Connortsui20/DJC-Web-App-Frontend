import axios from 'axios';


export default async function LoginGetToken(details) {
    //Sends email and password that was entered to the api, if correct the api sends a token back, token is stored in App.js

    let jwtToken = "";
    let err = null;

    try {
        const { data } = await axios.post('http://localhost:1337/auth/local', { //send login info to the api
            identifier: details.email,
            password: details.password,
        });
        jwtToken = data.jwt;  //if successful store jwt token for return
    } catch (error) {
        console.error("%c Login details are wrong", "color: yellow", error);
        err = error; //TODO extract error from this into App.js
        jwtToken = ""; //? probably dont need this, definetly doesnt hurt to be here though
    }

    return { //return object to use in App
        token: jwtToken,
        error: err,
    };

}

