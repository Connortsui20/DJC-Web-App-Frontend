import React, { useState } from 'react'

import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




function LoginForm({Login, loginError, theme}) {
    
    const [details, setDetails] = useState({email: "", password: ""});
    
    const submitHandler = e => {
        e.preventDefault(); //prevent page from re-rendering
        Login(details);
    }
    
    
    return (
        
        <form onSubmit={submitHandler} noValidate autoComplete="off" >
            <div>
                <div>
                    <Typography variant="h2" className={theme.title}>Login</Typography>
                </div>
                
                {(loginError !== "") ? (<div className={theme.errorText}>{<Typography variant="subtitle2">{loginError}</Typography> }</div>) : ""} 

                <div>
                    <TextField required className={theme.form} InputProps={{className: theme.formInput}} 
                        type="email" name="email" id="email" label="Email" variant="outlined" 
                        onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
                </div>

                <div>
                    <TextField required className={theme.form} InputProps={{className: theme.formInput}} 
                        type="password" name="password" id="password" label="Password" variant="outlined" 
                        onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                </div>

                {(details.email.length >= 3 && details.email.includes("@") && details.password.length >= 1) 
                    ? (<Button className={theme.button} type="submit" value="Login" variant="contained">
                        <Typography variant="h6">Login</Typography></Button>) 
                    : (<Button className={theme.emptyButton} variant="contained">
                    <   Typography variant="h6">Login</Typography></Button>)}    
                
            </div>
        </form>
    )






}






export default LoginForm
