import HeaderIn from './components/HeaderLoggedIn';
import ErrorPopup from './components/ErrorPopup';
import LogoutPopup from './components/LogoutPopup';
import DataTable from './components/DataTable';


export default function Home({ rows, Logout, handleOpenBarcode, handleOpenLogoutCheck, openError, handleCloseError,
    logoutCheck, handleCloseLogoutCheck, theme }) {

    return (
        <div>
            <div>
                <HeaderIn handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck} />
            </div>
            <div>
                <ErrorPopup openError={openError} handleCloseError={handleCloseError} theme={theme} />
                <LogoutPopup logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme} />
                <DataTable rows={rows} />
            </div>
        </div>
    );

}