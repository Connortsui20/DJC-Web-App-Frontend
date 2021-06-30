import React, { useEffect } from "react";

import HeaderIn from "../components/HeaderLoggedIn";
import ErrorPopup from "../components/ErrorPopup";
import LogoutPopup from "../components/LogoutPopup";
import DataTable from "../components/DataTable";


export default function Home({
    GetRows, rows, date, token, pageNumber, pageSize, count, handlePageChange,
    error, openError, handleCloseError, handleCloseLoginError,
    handleOpenBarcode, Logout, logoutCheck,
    handleOpenLogoutCheck, handleCloseLogoutCheck, theme }) {


    useEffect(() => { //? It might be better for performance if useCallback() is used instead of useEffect()
        GetRows(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, date, pageNumber]); //* do not get rid of the comment above

    return (
        <div>
            <div>
                <HeaderIn handleOpenBarcode={handleOpenBarcode} handleOpenLogoutCheck={handleOpenLogoutCheck} />
            </div>
            <div className={theme.table}>
                <ErrorPopup error={error} openError={openError} handleCloseError={handleCloseError} handleCloseLoginError={handleCloseLoginError} theme={theme} />
                <LogoutPopup logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme} />
                <DataTable rows={rows} pageNumber={pageNumber} pageSize={pageSize} count={count} handlePageChange={handlePageChange} theme={theme} />
            </div>
        </div>
    );

}