import HeaderIn from './components/HeaderLoggedIn';
import ErrorPopup from './components/ErrorPopup';
//import BarcodeScan from "./components/BarcodeScan";
import LogoutPopup from './components/LogoutPopup';
import DataTable from './components/DataTable';

import { Typography } from "@material-ui/core";

function Home({Logout, handleOpenBarcode, handleOpenLogoutCheck, openError, handleCloseError, openBarcode, 
    handleCloseBarcode, addBarcode, handleAddBarcode, logoutCheck, handleCloseLogoutCheck, theme}) {
    return(<div>
        <HeaderIn handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck}/>
        <ErrorPopup openError={openError} handleCloseError={handleCloseError} theme={theme}/>
        {/*<BarcodeScan openBarcode={openBarcode} handleCloseBarcode={handleCloseBarcode} addBarcode={addBarcode} handleAddBarcode={handleAddBarcode}/>*/}
        
        <LogoutPopup logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme}/>
        <DataTable/>
        <Typography variant="h2">{addBarcode}</Typography>
    </div>);

}



export default Home;