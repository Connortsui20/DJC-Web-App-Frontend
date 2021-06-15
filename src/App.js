import React, { useState } from "react";
import LoginForm from "./components/LoginForm"
import Button from '@material-ui/core/Button';


function App() {
  
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
      {(user.email !== "" && user.password !== "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.email}</span></h2>
          <Button variant="contained" color="primary" onClick={Logout}>Logout</Button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}  />
      )}
    </div>
  );
}

export default App;
