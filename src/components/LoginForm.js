import React, { useState } from "react"

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useTranslation } from "react-i18next";


export default function LoginForm({ Login, loginError, theme }) {
    //Login sets email and password, thus opening the home page
    //loginError will show up if email and password are incorrect

    const { t } = useTranslation();
    
    const [details, setDetails] = useState({ email: "", password: "" });

    const submitLogin = (e) => {
        e.preventDefault(); //prevent page from re-rendering
        Login(details);
    }

    return (

        <form onSubmit={submitLogin} noValidate autoComplete="off" >
            <div>
                <div>
                    <Typography variant="h2" className={theme.title}>{t("Login Title")}</Typography>
                </div>

                {(loginError !== "") ? (<div className={theme.errorText}>{<Typography variant="subtitle2">{loginError}</Typography>}</div>) : ""}

                <div>
                    <TextField required className={theme.form} InputProps={{ className: theme.formInput }}
                        type="email" name="email" id="email" label={t("Email")} variant="outlined"
                        onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </div>

                <div>
                    <TextField required className={theme.form} InputProps={{ className: theme.formInput }}
                        type="password" name="password" id="password" label={t("Password")} variant="outlined"
                        onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                </div>

                {(details.email.length >= 3 && details.email.includes("@") && details.password.length >= 1)
                    ? (<Button className={theme.button} type="submit" value="Login" variant="contained">
                        <Typography variant="h6">{t("Login Button")}</Typography></Button>)
                    : (<Button className={theme.emptyButton} variant="contained">
                        <   Typography variant="h6">{t("Login Button")}</Typography></Button>)}

            </div>
        </form>

    );

}