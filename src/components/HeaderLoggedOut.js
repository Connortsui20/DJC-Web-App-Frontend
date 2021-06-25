import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


export default function HeaderLoggedOut() {

    const useStyles = makeStyles((theme) => ({

        header: { //header color
            backgroundColor: "#039BE6",
        },

        title: { //text style
            fontWeight: 400,
            color: "white",
            textAlign: "left",
        }

    }));

    const headerTheme = useStyles();

    return (
        <header>
            <AppBar className={headerTheme.header} position="static">{
                <Toolbar>
                    <Typography variant="subtitle1" className={headerTheme.title}>
                        Delieverer Job Completion
                    </Typography>
                </Toolbar>
            }</AppBar>
        </header>
    );

}