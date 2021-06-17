import LoginForm from "./components/LoginForm"
import HeaderOut from './components/HeaderLoggedOut';


function LoginPage({Login, loginError, theme}){
    return(<div>            
        <HeaderOut/>     
        <LoginForm Login={Login} loginError={loginError} theme={theme}/>
    </div>);

}


export default LoginPage;