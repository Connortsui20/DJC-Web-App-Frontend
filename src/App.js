import React, { useState } from "react";

import LoginForm from "./components/LoginForm"

import HeaderIn from './components/HeaderLoggedIn';
import HeaderOut from './components/HeaderLoggedOut';
import DataTable from './components/DataTable';
import ErrorPopup from './components/ErrorPopup'

import Button from '@material-ui/core/Button';

import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
 
    form: { //form text box
        width: '100%', 
        margin: theme.spacing(2, 0), 
        color: "#D7DCDF",
    },

    formInput: { //Form text color
        color: "#5E646A"
    },

    title: { //"Deliverer Job Completion"
        display: "flex",
        fontWeight: 500,
        fontSize: "50px",
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(15, 0, 10)

    },

    emptyButton: { //when there is not enough information in the text fields
        width: "100%",
        margin: theme.spacing(3, 0, 5),
        color: "white",
        textTransform: "none",
        backgroundColor: "#B4B4B4",
        '&:hover': { //on hover
            backgroundColor: '#D7DCDF', //what color should this be?
            color: '#white',
        }
    },

    button: { //needs to be the same as empty button except different background color
        width: "100%",
        margin: theme.spacing(3, 0, 5),
        color: "white",
        textTransform: "none",
        backgroundColor: "#5093F2",
        '&:hover': { //on hover
            backgroundColor: '#0288D1', //what color should this be?
            color: '#white',
        }
    },

    errorText: { //error message
        color: "red",
        margin: theme.spacing(0, 1, 0)
    },

    welcome: { // welcome user message
        color: "black",
        marginTop: theme.spacing(15)
    },

    errorPopup: {
        margin: theme.spacing(10,10,10),
        alignItems: "center",
        justifyContent: "center"
    }

}));


function App() {
    
    const theme = useStyles();
    
    // const adminUser = {
    //     email: "admin@admin.com",
    //     password: "admin123"
    // }
    const adminUser = {
        email: "c@c",
        password: "asdf"
    }
    
    const [user, setUser] = useState({email: "", password: ""});
    const [loginError, setLoginError] = useState("");

    

    const Login = details => {
        if (details.email === adminUser.email && details.password === adminUser.password){    
                setUser({email: details.email, password: details.password});
        } else {
            setLoginError("Incorrect Username or Password");
        }
    }
    const Logout = () => {
        setUser({email: "", password: ""});
        setLoginError("");
    }



    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    return (
        
        <div className="App">

            {(user.email !== "" && user.password !== "") ? (
                <div>
                    <HeaderIn/>
                    <Typography className={theme.welcome} variant="h3">Welcome, <span>{user.email}</span></Typography>
                    <DataTable/>
                    <Button className={theme.button} variant="contained" onClick={Logout}>Logout</Button>
                </div>
            ) : (
                <div>            
                    <HeaderOut/>     
                    <ErrorPopup open={open} handleClose={handleClose} theme={theme}/>
                    <LoginForm Login={Login} loginError={loginError} theme={theme}/>
                </div>
            )}

        </div>
        
    );
}

export default App;
