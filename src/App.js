import React, { useState } from "react";

import LoginForm from "./components/LoginForm"

import HeaderIn from './components/HeaderLoggedIn';
import HeaderOut from './components/HeaderLoggedOut';
import DataTable from './components/DataTable';

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

    error: { //error message
        color: "red",
        margin: theme.spacing(1,2,1)

    },

    welcome: { // welcome user message
        color: "black",
        marginTop: theme.spacing(15)
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
    
    const [user, setUser] = useState({email: ""});
    const [error, setError] = useState("");

    const Login = details => {
        if (details.email === adminUser.email && details.password === adminUser.password){    
                setUser({email: details.email});
            }
        else {
            setError("Incorrect Username or Password")
        }
    }
    
    const Logout = () => {
        setUser({email: ""});
    }

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
                    <LoginForm Login={Login} error={error} theme={theme}/>
                </div>
            )}

        </div>
        
    );
}

export default App;
