import React from "react";

import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

export default function HeaderLoggedIn({ handleOpenBarcode, handleOpenLogoutCheck }) { 
    //handleOpenBarcode opens barcode scanning page
    //handleOpenLogoutCheck opens logout popup check

    const useStyles = makeStyles((theme) => ({

        header: { //header color
            backgroundColor: "#039BE6",
            
        },

        button: { //button colors
            color: "white",
            "&:hover": { //on hover
                backgroundColor: "#0288D1",
            },
        },

        right: { //justify exit icon on the right
            marginLeft: "auto"
        }

    }));

    const headerTheme = useStyles();

    return (
        

            <AppBar className={headerTheme.header} position="static">{
                <Toolbar >
                    <Button className={headerTheme.button} onClick={handleOpenBarcode}>
                        <AddIcon />
                    </Button>
                    <div className={headerTheme.right}>
                        <Button className={headerTheme.button} onClick={handleOpenLogoutCheck}>
                            <ExitToAppIcon />
                        </Button></div>
                </Toolbar>
            }</AppBar> 
        
    );

}