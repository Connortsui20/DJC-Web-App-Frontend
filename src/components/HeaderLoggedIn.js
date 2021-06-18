import React from "react";

import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


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
        <header>
            <AppBar className={headerTheme.header}>{
                <Toolbar>
                    <Button className={headerTheme.button} onClick={handleOpenBarcode}>
                        <AddIcon />
                    </Button>
                    <div className={headerTheme.right}>
                        <Button className={headerTheme.button} onClick={handleOpenLogoutCheck}>
                            <ExitToAppIcon />
                        </Button></div>
                </Toolbar>
            }</AppBar>
        </header>
    );

}