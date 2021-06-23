
import axios from 'axios';


export default async function LoginGetToken(details) {

    try {
        const { data } = await axios.post('http://localhost:1337/auth/local', {
            identifier: details.email, 
            password: details.password,
        });

        const jwtToken = data.jwt;
        //console.log(jwtToken);
        return (jwtToken); //return token here
        

    } catch (error) {
        console.log("%c error happened", "color: red", error);
        return("");
    }


   
}

