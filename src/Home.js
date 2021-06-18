import HeaderIn from './components/HeaderLoggedIn';
import ErrorPopup from './components/ErrorPopup';
//import BarcodeScan from "./components/BarcodeScan";
import LogoutPopup from './components/LogoutPopup';
import DataTable from './components/DataTable';


function Home({rows, Logout, handleOpenBarcode, handleOpenLogoutCheck, openError, handleCloseError, 
    logoutCheck, handleCloseLogoutCheck, theme}) {
    return(<div>
        <HeaderIn handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck}/>
        <ErrorPopup openError={openError} handleCloseError={handleCloseError} theme={theme}/>
        <LogoutPopup logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme}/>
        <DataTable rows={rows}/>

    </div>);

}



export default Home;