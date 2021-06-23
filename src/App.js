import React, { useState, useEffect } from "react";

import NoPageFound from "./components/NoPageFound";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import BarcodeScanPage from "./pages/BarcodeScanPage";

import LoginGetToken from "./apiFunctions/LoginGetToken";

import { makeStyles } from "@material-ui/core/styles";

import { useRoutes, navigate } from "hookrouter";


const useStyles = makeStyles((theme) => ({

    form: { //form text box
        width: "100%",
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
        margin: theme.spacing(10, 0, 10)

    },

    emptyButton: { //when there is not enough information in the text fields
        width: "100%",
        margin: theme.spacing(3, 0, 5),
        color: "white",
        textTransform: "none",
        backgroundColor: "#B4B4B4",
        "&:hover": { //on hover
            backgroundColor: "#D7DCDF",
            color: "#white",
        }
    },

    button: { //* needs to be the same as emptyButton except different backgroundColor
        width: "100%",
        margin: theme.spacing(3, 0, 5),
        color: "white",
        textTransform: "none",
        backgroundColor: "#5093F2",
        "&:hover": { //on hover
            backgroundColor: "#0288D1",
            color: "#white",
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

}));

/**************************************************************************************************************************/

export default function App() {

    const theme = useStyles();

    //const [user, setUser] = useState({ email: "", password: "" }); //sets email and password after successful login

    const [token, setToken] = useState("")

    const [loginError, setLoginError] = useState(""); //error message if email and password are incorrect
    const [logoutCheck, setLogoutCheck] = useState(false); //opens and closes logout popup check

    //const [error, setError] = useState(""); //TODO will eventually use this for error code 4xx/5xx from api
    const [openError, setOpenError] = useState(false); //opens an error popup based on error and setError

    const [openBarcode, setOpenBarcode] = useState(false); //open barcode scanning page

    const [rows, setRows] = useState([ //TODO eventually will pull from a json file
        { id: "test1", SubmitTime: "00:10 PM" },
        { id: "2test", SubmitTime: "00:02 AM" },
        { id: "test3", SubmitTime: "03:01 PM" },
    ]);
    

    const [date, setDate] = useState(new Date()); //gets the date and time //! this only works on the opening of the scan page, not after the scan happens

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 60000) //pulls date every minute //? not sure how to make this more accurate
        return function cleanup() {
            clearInterval(timer)
        }
    });

    /**************************************************************************************************************************/

    const handleOpenLogoutCheck = () => { //opens logout popup
        setLogoutCheck(true);
    }

    const handleCloseLogoutCheck = () => { //closes logout popup
        setLogoutCheck(false);
    };

    const Login = (details) => { //TODO login with strapi api

        const tokenPromise = LoginGetToken(details) //jwt is the promise
        
        tokenPromise.then((jwtToken) => {
            if (jwtToken !== ""){
                setToken(jwtToken);
            } else {
                setLoginError("Incorrect Username or Password");
            }
            
        })

        tokenPromise.catch((error) => {
            console.error(error);
        })

    }

    const Logout = () => { //logs out and clears email and password
        //setUser({ email: "", password: "" });
        setToken(""); //? How should the user logout? by clearing the token or changing pages?
        setLoginError("");
    }

    const handleOpenBarcode = () => { //opens barcode scanning page
        setOpenBarcode(true);
    }
    const handleCloseBarcode = () => { //closes barcode scanning page
        setOpenBarcode(false)
    }

    const handleAddBarcode = (barcode) => { //adds the barcode once the scanner finds anything
        setDate(new Date()); //! This doesn't do anything and it still doesn't work properly, it will take the time that the user opens the scan page but not when they actually scan
        setRows(rows => [{ id: barcode, SubmitTime: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }].concat(rows)); //* must use .concat instead of .push, because it creates a new array instead of appending
    }
    //console.table(rows);

    const handleCloseError = () => {  //closes error popup message
        setOpenError(false);
    };

    /**************************************************************************************************************************/

    const routes = { //all url routes
        "/home": () => <Home rows={rows} handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck}
            openError={openError} handleCloseError={handleCloseError}
            logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme} />,
        "/login": () => <LoginPage Login={Login} loginError={loginError} theme={theme} />,
        "/scan": () => <BarcodeScanPage handleCloseBarcode={handleCloseBarcode} handleAddBarcode={handleAddBarcode} />
    };

    const routeResult = useRoutes(routes); //hook for hookrouter


    return ( //application starts here
        <div className="App">
            {(token !== "") ?
                ((!openBarcode) ? (navigate("/home")) : (navigate("/scan"))
                ) : (navigate("/login"))}
            {routeResult || <NoPageFound />}
        </div>
    );

}