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

export default function App() {

    const theme = useStyles();

    const [token, setToken] = useState("");
    const [loginError, setLoginError] = useState(""); //error message if email and password are incorrect

    const [logoutCheck, setLogoutCheck] = useState(false); //opens and closes logout popup check

    //const [error, setError] = useState(""); //TODO will eventually use this for error code 4xx/5xx from api
    const [openError, setOpenError] = useState(false); //opens an error popup based on error and setError

    const [openBarcode, setOpenBarcode] = useState(false); //open barcode scanning page

    const [rows, setRows] = useState([]);

    const [date, setDate] = useState(moment().format()); //gets the date and time 


    /**************************************************************************************************************************/

    const handleOpenLogoutCheck = () => { //opens logout popup
        setLogoutCheck(true);
    }

    const handleCloseLogoutCheck = () => { //closes logout popup
        setLogoutCheck(false);
    };

    const Login = async (details) => {

        const jwtToken = await LoginGetToken(details);

        if (jwtToken.error === null) {
            console.log("No login error!");
            setToken(jwtToken.token);
        } else { // (if jwtToken has something)
            setLoginError("Incorrect login details"); //TODO add exact error functionality
        }

    }

    const GetRows = async (token) => {
        const pageNumber = 1; //TODO figure out page number functionality, maybe pass through function
        const pageSize = 5;
        const data = await GetData(token, pageNumber, pageSize);
        if (data.error === null) {
            //console.log("No data error");
            convertTime(data.rows);
            setRows(data.rows);
            console.table(data.rows);

        } else {
            console.error("something is wrong with the rows")
        }
    }

    function convertTime(arr) {
        for (var i in arr) {
            arr[i].submission_date = moment(arr[i].submission_date).format('DD/MM/YYYY HH:mm:ss');
        }
    }

    const Logout = () => { //logs out and clears email and password
        //setUser({ email: "", password: "" });
        setToken(""); //TODO add token to local storage
        setLoginError("");
    }

    const handleOpenBarcode = () => { //opens barcode scanning page
        setOpenBarcode(true);
    }
    const handleCloseBarcode = () => { //closes barcode scanning page
        setOpenBarcode(false)
    }

    const handleAddBarcode = async (barcode) => { //adds the barcode once the scanner finds anything
        setDate(moment().format()); //! this only works on the opening of the scan page, not after the scan happens
        await CreateBarcode(token, barcode, date);
    }

    const handleCloseError = () => {  //closes error popup message
        setOpenError(false);
    };

    /**************************************************************************************************************************/

    const routes = { //all url routes
        "/home": () => <Home GetRows={GetRows} rows={rows} date={date} token={token} handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck}
            openError={openError} handleCloseError={handleCloseError}
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