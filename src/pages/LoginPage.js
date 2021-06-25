import LoginForm from "../components/LoginForm"
import HeaderOut from "../components/HeaderLoggedOut";

import { makeStyles } from "@material-ui/core/styles";


export default function LoginPage({ retrieveToken, Login, loginError, theme }) {
    
    retrieveToken(); //If the token is retrieved successfully, the app will automatically login and skip the page
    
    const useStyles = makeStyles((theme) => ({

        form: { //padding to form
            padding: "0 5%"
        },

    }));

    const formTheme = useStyles();

    return (
        <div>
            <HeaderOut />
            <div className={formTheme.form}>
            <LoginForm Login={Login} loginError={loginError} theme={theme} />
            </div>
        </div>
    );

}