import React, { useState } from "react";
import ReactDOM from "react-dom";


import NoPageFound from "./components/NoPageFound";


import LoginPage from "./LoginPage";
import Home from "./Home";
//import BarcodeScanPage from "./BarcodeScanPage";

//import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { useRoutes, navigate } from "hookrouter";



const useStyles = makeStyles((theme) => ({
 
    form: { //form text box
        width: '100%', 
        margin: theme.spacing(2, 0), 
        color: "#D7DCDF",
    },

    formInput: { //Form text color
        color: "#5E646A"
    },

    title: { //"Login"
        display: "flex",
        fontWeight: 500,
        fontSize: "30px",
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(15, 0, 15)

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
            backgroundColor: '#0288D1', 
            color: '#white',
        }
    },

    errorText: { //error message
        color: "red",
        margin: theme.spacing(0, 1, 0),
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
    const [logoutCheck, setLogoutCheck] = useState(false);
        
    const handleOpenLogoutCheck = () => {
        setLogoutCheck(true);
    }
    
    const handleCloseLogoutCheck = () => {
        setLogoutCheck(false);
      };

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


    const [addBarcode, setAddBarcode] = useState("Not Found");
    const [openBarcode, setOpenBarcode] = useState(false);

    const handleOpenBarcode = () => {
        setOpenBarcode(true);
    }
   
    const handleCloseBarcode = () => {
        setOpenBarcode(false)
    }

    const handleAddBarcode = (barcode) => {
        if (barcode) {
            setAddBarcode(barcode);
        } else {
            setAddBarcode("Not Found");
        }
    }


    //const [error, setError] = useState("");

    const [openError, setOpenError] = useState(false);

    const handleCloseError = () => {
      setOpenError(false);
    };


    const routes = {
        "/home" : () => <Home handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck}
                        openError={openError} handleCloseError={handleCloseError}
                        openBarcode={openBarcode} handleCloseBarcode={handleCloseBarcode} addBarcode={addBarcode} handleAddBarcode={handleAddBarcode}
                        logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme}
                        />,
        "/login" : () => <LoginPage Login={Login} loginError={loginError} theme={theme}/>,
      };
    
    const routeResult = useRoutes(routes);


    return (
        
        <div className="App">

            {(user.email !== "" && user.password !== "") ? (navigate("/home")) : (navigate("/login"))}
            {routeResult || <NoPageFound/>}    

        </div>
        
    );

}

export default App;










