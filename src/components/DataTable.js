import * as React from "react";

import { DataGrid } from "@material-ui/data-grid";

import { useTranslation } from "react-i18next";


export default function DataTable({ rows, pageNumber, count, handlePageChange, pageSize, theme }) {
    //rows is defined in App(), should only have 2 columns id and SubmitTime

    const { t } = useTranslation();

    const columns = [
        { field: 'id', hide: true },
        { field: "delivery_note_number", headerName: t("Barcode Numbers"), align: "left", headerAlign: "left", width: "50%" },
        { field: "submission_date", headerName: t("Submission Time"), align: "right", headerAlign: "right", width: "50%" },
    ]; //* this only defines and styles the header, column cells are styled in index.css line 1 (.MuiDataGrid-renderingZone !important) to be 100% width

    return (
        <div className={theme.data}>
            <DataGrid autoHeight={true} rows={rows} columns={columns} page={pageNumber} pageSize={pageSize} rowCount={count} paginationMode={'server'} onPageChange={handlePageChange} disableExtendRowFullWidth={false} />
        </div>
    );

}