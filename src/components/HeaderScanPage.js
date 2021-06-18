import React from "react";

import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default function HeaderScanPage({ handleCloseBarcode }) {

    const useStyles = makeStyles((theme) => ({

        header: { //header color
            backgroundColor: "#039BE6",
        },

        button: { //button colors
            color: "white",
            '&:hover': { //on hover
                backgroundColor: '#0288D1',
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
                    <Button className={headerTheme.button} onClick={handleCloseBarcode}>
                        <ArrowBackIcon />
                    </Button>

                </Toolbar>
            }</AppBar>
        </header>
    );

}