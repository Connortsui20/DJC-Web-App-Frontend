import * as React from "react";

import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from "react-i18next";


export default function DataTable({ rows, pageNumber, count, handlePageChange, pageSize }) {
    //rows is defined in App(), should only have 2 columns id and SubmitTime

    const { t } = useTranslation();

    const useStyles = makeStyles((theme) => ({
        table: {
            width: "100%", 
            marginBottom: theme.spacing(5),
        }
    }));

    const dataTheme = useStyles();

    const columns = [
        { field: 'id', hide: true },
        { field: "delivery_note_number", headerName: t("Barcode Numbers"), align: "left", headerAlign: "left", width: "50%" },
        { field: "submission_date", headerName: t("Submission Time"), align: "right", headerAlign: "right", width: "50%" },
    ]; //* this only defines and styles the header, column cells are styled in index.css line 1 (.MuiDataGrid-renderingZone !important) to be 100% width

    return (
        <div className={dataTheme.table}>
            <DataGrid autoHeight={true} rows={rows} columns={columns} page={pageNumber} pageSize={pageSize} rowCount={count} paginationMode={'server'} onPageChange={handlePageChange} disableExtendRowFullWidth={false} />
        </div>
    );

}