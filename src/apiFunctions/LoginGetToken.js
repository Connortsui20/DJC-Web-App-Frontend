
import axios from 'axios';


//TODO look into wrapper class

export default async function LoginGetToken(details) {

    let jwtToken = "";
    let err = null;

    try {
        const { data } = await axios.post('http://localhost:1337/auth/local', {
            identifier: details.email,
            password: details.password,
        });

        jwtToken = data.jwt;

       
    } catch (error) {
        console.error("%c Login details are wrong", "color: yellow", error); //TODO extract error from this into App.js
        err = error;
        jwtToken = ""; //? probably dont need this, definetly doesnt hurt to be here though
    }

    return {
        token: jwtToken,
        error: err
    };


}

