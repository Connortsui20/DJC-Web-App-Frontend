import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';








export default function Header() {
  

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

    const { header, title } = useStyles();

  return (
    <header>
        <AppBar className={header}>{
            <Toolbar>
                <Typography variant="h6" className={title}>
                    Delieverer Job Completion
                </Typography>
            </Toolbar>
            }</AppBar>
    </header>
  );

}