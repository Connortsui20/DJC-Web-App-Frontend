import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';



export default function HeaderLoggedOut() {

    const useStyles = makeStyles((theme) => ({
        
        header: {
            backgroundColor: "#039BE6",
        },

        title: {
            fontWeight: 500,
            color: "white",
            textAlign: "left",
        }

    }));

    const headerTheme = useStyles();

    return (
        <header>
            <AppBar className={headerTheme.header}>{
                <Toolbar>
                    <Typography variant="h6" className={headerTheme.title}>
                        Delieverer Job Completion
                    </Typography>
                </Toolbar>
            }</AppBar>
        </header>
    );

}



