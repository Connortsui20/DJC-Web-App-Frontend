import LoginForm from "../components/LoginForm"
import HeaderOut from "../components/HeaderLoggedOut";


export default function LoginPage({ Login, loginError, theme }) {


    return (
        <div>
            <HeaderOut />
            <div className={theme.login}>
                <LoginForm Login={Login} loginError={loginError} theme={theme} />
            </div>
        </div>
    );

}