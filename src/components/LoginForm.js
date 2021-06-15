import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function LoginForm({Login, error}) {
    
    const [details, setDetails] = useState({name: "", email: "", password: ""});
    
    const submitHandler = e => {
        e.preventDefault(); //precent page from re-rendering
        Login(details);
    }
    
    
    return (
        // <form className="form" >
        //    
        //     <TextField id="standard-basic" label="Standard" />
        //     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        // </form>
        
        
        <form onSubmit={submitHandler} noValidate autoComplete="off" >
            <div>
                <h2>Login</h2>
                {(error !== "") ? (<div className="error">{error}</div>) : ""}
                <div>
                    <TextField required type="email" name="email" id="email" label="Email" variant="outlined" 
                    onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
                </div>
                <div>
                    <TextField required type="password" name="password" id="password" label="Password" variant="outlined" 
                    onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                </div>
                {(details.email.length >= 3 && details.email.includes("@") && details.password.length >= 1) 
                ? (<Button type="submit" value="Login" variant="contained" color="primary">Login</Button>) : ("")}    
            </div>
        </form>
    )






}






export default LoginForm
