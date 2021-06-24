import React, { useState, useEffect } from "react";

import NoPageFound from "./components/NoPageFound";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import BarcodeScanPage from "./pages/BarcodeScanPage";

import LoginGetToken from "./apiFunctions/LoginGetToken";
import GetData from "./apiFunctions/GetData";
import CreateBarcode from "./apiFunctions/CreateBarcode";

import { makeStyles } from "@material-ui/core/styles";

import { useRoutes, navigate } from "hookrouter";

import moment from 'moment';
import 'moment-timezone';


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
//TODO add local storage functionality, store the jwt token
//TODO make the error popups more robust, add the function to the other places, decide what to do on login page error
//TODO figure out how the data table page numbers work

export default function App() {

    const theme = useStyles();

    const [token, setToken] = useState("");
    const [loginError, setLoginError] = useState(""); //error message if email and password are incorrect

    const [logoutCheck, setLogoutCheck] = useState(false); //opens and closes logout popup check

    //! Should I make it so that every time setError is called the popup comes up automatically? right now the error is set and then the popup is opened
    const [error, setError] = useState(""); //TODO use this for every type of error (except login errors for now)
    const [openError, setOpenError] = useState(false); //opens an error popup based on error and setError

    const [openBarcode, setOpenBarcode] = useState(false); //open barcode scanning page

    const [date, setDate] = useState(moment().format()); //gets the date and time 
    const [rows, setRows] = useState([]);

    /**************************************************************************************************************************/

    const handleOpenLogoutCheck = () => { setLogoutCheck(true); };//opens logout popup
    const handleCloseLogoutCheck = () => { setLogoutCheck(false); }; //closes logout popup

    const Login = async (details) => {
        const jwtToken = await LoginGetToken(details);
        if (jwtToken.error === null) {
            setToken(jwtToken.token);
        } else { // (if jwtToken has something)
            setLoginError("Incorrect login details"); //TODO add exact error functionality
        }
    };

    const GetRows = async (token) => { //* This function only happens in the home page, under the useEffect() hook
        const pageNumber = 1; //TODO figure out page number functionality, maybe pass through function
        const pageSize = 100;
        const data = await GetData(token, pageNumber, pageSize);
        if (data.error === null) {
            convertTime(data.rows);
            setRows(data.rows);
        } else {
            setError(data.error);
            setOpenError(true);
        }
    };

    function convertTime(arr) {
        for (var i in arr) {
            arr[i].submission_date = moment(arr[i].submission_date).format('HH:mm:ss, DD/MM/YYYY');
        }
    }

    const Logout = () => { //logs out and clears email and password
        //setUser({ email: "", password: "" });
        setToken(""); //TODO add token to local storage
        setLoginError("");
    };

    const handleOpenBarcode = () => { setOpenBarcode(true); }; //opens barcode scanning page
    const handleCloseBarcode = () => { setOpenBarcode(false); }; //closes barcode scanning page

    const handleAddBarcode = async (barcode) => { //adds the barcode once the scanner finds anything
        setDate(moment().format()); //! The only point in having date and setDate is to update useEffect() in Home.js, there is definitely a better way to do this
        await CreateBarcode(token, barcode, moment().format()) 
        .catch(error => {
            setError(error);
            setOpenError(true);
        });

    }; //* it does not matter how the time is formatted here because api will conver it anyways, must convert time when reading from api

    const handleCloseError = () => { setOpenError(false); }; //closes error popup message
    const handleResetError = () => { setError(""); };

    /**************************************************************************************************************************/

    const routes = { //all url routes
        "/home": () => <Home GetRows={GetRows} rows={rows} date={date} token={token}
            handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck}
            error={error} openError={openError} handleCloseError={handleCloseError} handleResetError={handleResetError}
            logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme} />,
        "/login": () => <LoginPage Login={Login} loginError={loginError} theme={theme} />,
        "/scan": () => <BarcodeScanPage handleCloseBarcode={handleCloseBarcode} handleAddBarcode={handleAddBarcode} />
    };

    const routeResult = useRoutes(routes); //hook for hookrouter


    return ( //application starts here
        <div className="App">
            {(token !== "" && token !== null && token !== undefined) ?
                ((!openBarcode) ? (navigate("/home")) : (navigate("/scan"))
                ) : (navigate("/login"))}
            {routeResult || <NoPageFound />}
        </div>
    );

}