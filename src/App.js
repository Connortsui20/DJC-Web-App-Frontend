import React, { useState } from "react";

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
import 'moment-timezone'; // could use in the future

import { useTranslation } from "react-i18next";
import "./i18n.js";



const useStyles = makeStyles((theme) => ({

    form: { //form text box
        width: "100%",
        margin: theme.spacing(2, 0),
        color: "#D7DCDF",
    },

    formInput: { //Form text color
        color: "#5E646A",
    },

    title: { //"Login"
        display: "flex",
        fontWeight: 500,
        fontSize: "30px",
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(10, 0, 10),

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

    const { t } = useTranslation();

    const theme = useStyles();

    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const [loginError, setLoginError] = useState(""); //error message if email and password are incorrect
    const [logoutCheck, setLogoutCheck] = useState(false); //opens and closes logout popup check

    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false); //opens an error popup based on error and setError

    const [openBarcode, setOpenBarcode] = useState(false); //open barcode scanning page

    const [date, setDate] = useState(moment().format()); //gets the date and time 
    const [rows, setRows] = useState([]); //will become an array of objects
    const [count, setCount] = useState(100); //max is 100 so just set to 100 for default
    const [pageNumber, setPageNumber] = useState(0);
    const pageSize = 10; //the # of scans the api requests is equal to the amount shown on the grid

    /**************************************************************************************************************************/

    const Login = async (details) => {
        const {token, error} = await LoginGetToken(details);
        if (error === null) {
            setToken(token);
        } else { // (if jwtToken has something)
            setLoginError(t("Incorrect Login")); //* can potentially pass something else through here
        }
    };

    const GetRows = async (token) => { //* This function is called in Home.js, under the useEffect() hook
        const dataPageNumber = pageNumber; //* these are for api data only, does not affect the frontend grid
        const { rows, count, error } = await GetData(token, handleLoginErrorPopup, dataPageNumber, pageSize);
        if (error === null) {
            const convertedTime = convertTime(rows);
            setRows(convertedTime);
            setCount(count);
        } else {
            setError(error);
            setOpenError(true);
        }
    };

    const handlePageChange = (params) => {
        setPageNumber(params.page); //* page numbers index from 0
    };

    const convertTime = (arr) => {
        for (var i in arr) {
            arr[i].submission_date = moment(arr[i].submission_date).format('HH:mm:ss, DD/MM/YYYY'); //change all submission_date formats
        }
        return arr;
    };

    const handleOpenLogoutCheck = () => { setLogoutCheck(true); };//opens logout popup
    const handleCloseLogoutCheck = () => { setLogoutCheck(false); }; //closes logout popup

    const Logout = () => { //logs out and clears email and password
        localStorage.clear();
        setToken("");
        setLoginError("");
        console.log("%c Logout successful ", "color: purple; font-weight: bold");
    };

    const handleOpenBarcode = () => { setOpenBarcode(true); }; //opens barcode scanning page
    const handleCloseBarcode = () => { setOpenBarcode(false); }; //closes barcode scanning page

    //* it does not matter how the time is formatted here because api will conver it anyways, must convert time when reading from api
    const handleAddBarcode = async (barcode) => { //adds the barcode once the scanner finds anything
        setDate(moment().format()); //! The only point in having date and setDate is to update useEffect() in Home.js, there is definitely a better way to do this
        const { postBarcode, postError } = await CreateBarcode(token, barcode, moment().format(), handlePostError);
        if (postError !== null) {
            handlePostError(postError);
        } //else do nothing
    };

    const handlePostError = (error) => {
        setError(error);
        setOpenError(true);
    }; //opens error when barcode creation fails

    const handleCloseError = () => {
        setError("");
        setOpenError(false);
    }; //closes error popup message

    const handleLoginErrorPopup = (error) => {
        if (error.response?.status === 401) { //specific message for 401 error
            setError({
                response: {
                    status: 401,
                },
                message: t("Error 401 Message"),
            });
            setOpenError(true)
        } else {
            setError(error);
            setOpenError(true);
        }

    }; //* specifically made for if the token expires

    const handleCloseLoginError = () => {
        setError("");
        setOpenError(false);
        localStorage.clear();
        setToken("");
    };


    // navigator.getUserMedia (
    //     // constraints
    //     {
    //        video: true,
    //        audio: true
    //     },

    //     // successCallback
    //     function(localMediaStream) {
    //        var video = document.querySelector('video');
    //        video.src = window.URL.createObjectURL(localMediaStream);
    //        video.onloadedmetadata = function(e) {
    //           // Do something with the video here.
    //        };
    //     },

    //     // errorCallback
    //     // function(err) {
    //     //  if(err === PERMISSION_DENIED) {
    //     //    // Explain why you need permission and how to update the permission setting
    //     //  }
    //     // }
    //  );



    /**************************************************************************************************************************/

    const routes = { //all url routes
        "/home": () => <Home
            GetRows={GetRows} rows={rows} date={date} token={token} pageNumber={pageNumber} pageSize={pageSize} count={count} handlePageChange={handlePageChange}
            error={error} openError={openError} handleCloseError={handleCloseError} handleCloseLoginError={handleCloseLoginError}
            handleOpenBarcode={handleOpenBarcode} Logout={Logout} logoutCheck={logoutCheck}
            handleOpenLogoutCheck={handleOpenLogoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} theme={theme} />,
        "/login": () => <LoginPage Login={Login} loginError={loginError} theme={theme} />,
        "/scan": () => <BarcodeScanPage handleCloseBarcode={handleCloseBarcode} handleAddBarcode={handleAddBarcode} />,
        "/something": () => <NoPageFound />,
    };

    const routeResult = useRoutes(routes); //hook for hookrouter, routes are states that get changed by routeResult

    return ( //application starts here
        <div className="App">
            {(token !== "" && token !== null && token !== undefined) ?
                ((!openBarcode) ? (navigate("/home")) : (navigate("/scan"))
                ) : (navigate("/login"))}
            {routeResult || <NoPageFound />}
        </div>
    );

}