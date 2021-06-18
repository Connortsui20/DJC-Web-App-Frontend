import React, { useState, useEffect } from "react";

import NoPageFound from "./components/NoPageFound";
import LoginPage from "./LoginPage";
import Home from "./Home";
import BarcodeScanPage from "./BarcodeScanPage";

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
        margin: theme.spacing(15, 0, 15)

    },

    emptyButton: { //when there is not enough information in the text fields
        width: "100%",
        margin: theme.spacing(3, 0, 5),
        color: "white",
        textTransform: "none",
        backgroundColor: "#B4B4B4",
        "&:hover": { //on hover
            backgroundColor: "#D7DCDF", //what color should this be?
            color: "#white",
        }
    },

    button: { //needs to be the same as empty button except different background color
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

    const adminUser = {
        //email: "admin@admin.com",
        //password: "admin123"
        email: "c@c",
        password: "asdf"
    }

    const [user, setUser] = useState({ email: "", password: "" }); //sets email and password after successful login

    const [loginError, setLoginError] = useState(""); //error message if email and password are incorrect
    const [logoutCheck, setLogoutCheck] = useState(false); //opens and closes logout popup check

    //const [error, setError] = useState(""); //will eventually use this for error code 4xx/5xx from api
    const [openError, setOpenError] = useState(false); //opens an error popup based on error and setError

    const [openBarcode, setOpenBarcode] = useState(false); //open barcode scanning page

    const [rows, setRows] = useState([ //eventually will pull from a json file
        { id: "test1", SubmitTime: "00:10 PM" },
        { id: "2test", SubmitTime: "00:02 AM" },
        { id: "test3", SubmitTime: "03:01 PM" },
    ]);

    const [date, setDate] = useState(new Date()); //gets the date and time

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 60000) //pulls date every minute
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

    const Login = details => { //sets user and email if correct, if not correct sends login error
        if (details.email === adminUser.email && details.password === adminUser.password) {
            setUser({ email: details.email, password: details.password });
        } else {
            setLoginError("Incorrect Username or Password");
        }
    }

    const Logout = () => { //logs out and clears email and password
        setUser({ email: "", password: "" });
        setLoginError("");
    }

    const handleOpenBarcode = () => { //opens barcode scanning page
        setOpenBarcode(true);
    }
    const handleCloseBarcode = () => { //closes barcode scanning page
        setOpenBarcode(false)
    }

    const handleAddBarcode = (barcode) => { //adds the barcode once the scanner finds anything
        setDate(new Date()); //This doesn't do anything and it still doesn't work properly, it will take the time that the user opens the scan page but not when they actually scan
        setRows(rows => [{ id: barcode, SubmitTime: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }].concat(rows)); //must use .concat instead of .push, because it creates a new array instead of appending
    }

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
            {(user.email !== "" && user.password !== "") ?
                ((!openBarcode) ? (navigate("/home")) : (navigate("/scan"))
                ) : (navigate("/login"))}
            {routeResult || <NoPageFound />}
        </div>
    );

}