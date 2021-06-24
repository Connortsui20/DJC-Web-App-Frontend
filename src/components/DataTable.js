import * as React from "react";

import { DataGrid } from "@material-ui/data-grid";


export default function DataTable({ rows }) {
    //rows is defined in App(), should only have 2 columns id and SubmitTime

    const columns = [
        { field: 'id', hide: true },
        { field: "delivery_note_number", headerName: "Delivery Note Number", align: "left", headerAlign: "left", width: "50%" },
        { field: "submission_date", headerName: "Submission Time", align: "right", headerAlign: "right", width: "50%" },
    ]; //* this is just styling the header, column cells are styled in index.css line 1 (.MuiDataGrid-renderingZone !important) to be 100% width

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid disableExtendRowFullWidth={false} rows={rows} columns={columns} pageSize={5} />
        </div>
    );

}