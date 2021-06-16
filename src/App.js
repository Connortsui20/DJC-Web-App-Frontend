import React, { useState } from "react";
import LoginForm from "./components/LoginForm"
import Header from './components/Header';
import Button from '@material-ui/core/Button';

import { Typography } from "@material-ui/core";


import { makeStyles } from '@material-ui/core/styles';





const useStyles = makeStyles((theme) => ({
 
  form: { //form text box
    width: '100%', 
    margin: theme.spacing(2, 0), 
    color: "#D7DCDF",
  },

  formInput: { //Form text color
    color: "#5E646A"
  },

  title: { //"Deliverer Job Completion"
    display: "flex",
    fontSize: "30px",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(15, 0, 10)

  },

  emptyButton: { //when there is not enough information in the text fields
    width: "100%",
    margin: theme.spacing(3, 0, 5),
    color: "white",
    backgroundColor: "#B4B4B4"
  },

  button: { //needs to be the same as empty button except different background color
    width: "100%",
    margin: theme.spacing(3, 0, 5),
    color: "white",
    backgroundColor: "#5093F2",
    '&:hover': { //on hover
      backgroundColor: '#0288D1', //what color should this be?
      color: '#white',
    }
  },

  error: { //error message
    color: "red",
    margin: theme.spacing(1,2,1)

  },

  welcome: {
    color: "black",
    marginTop: theme.spacing(15)
  }

}));


function App() {
  
  const theme = useStyles();
  
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }
  
  const [user, setUser] = useState({email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    
    if (details.email === adminUser.email && details.password === adminUser.password){  
        setUser({email: details.email});
      }
    else {
      setError("Incorrect Username or Password")
    }
  }
  
  const Logout = () => {
    setUser({email: ""});
  }

  return (
    
    <div className="App">

      <Header/>

      {(user.email !== "" && user.password !== "") ? (
        <div className={theme.gradient}>
          <Typography className={theme.welcome} variant="h3">Welcome, <span>{user.email}</span></Typography>
          <Button className={theme.button} variant="contained" onClick={Logout}>Logout</Button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} theme={theme}/>
      )}

    </div>
    
  );
}

export default App;
