import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from "react-i18next";


export default function HeaderLoggedOut() {

    const { t } = useTranslation();

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
                        {t("Login Header")}
                    </Typography>
                </Toolbar>
            }</AppBar>
        </header>
    );

}