import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from '@material-ui/core/Button';



export default function HeaderLoggedIn() {

    const useStyles = makeStyles((theme) => ({
        
        header: {
            backgroundColor: "#039BE6",
        },

        button: {
            color: "white"
        },

        right: {
            marginLeft: "auto"
        }

     
    }));

    const headerTheme = useStyles();

    return (
        <header>
            <AppBar className={headerTheme.header}>{
                <Toolbar>
                    <Button className={headerTheme.button}>
                        <AddIcon/>
                    </Button>
                    <div className={headerTheme.right}><Button className={headerTheme.button}>
                        <ExitToAppIcon/>
                    </Button></div>
                </Toolbar>    
            }</AppBar>
        </header>
    );








}