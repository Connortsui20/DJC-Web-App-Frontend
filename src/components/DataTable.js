import * as React from "react";

import { DataGrid } from "@material-ui/data-grid";


export default function DataTable({ rows }) {

    const columns = [
        { field: "id", headerName: "Deliver Note No.", align: "left", headerAlign: "left", width: "50%" },
        { field: "SubmitTime", headerName: "Submit Time", align: "right", headerAlign: "right", width: "50%" },
    ]; //this is just styling the header, column cells are styled in index.css to be 100% width

    return (
        <div style={{ height: 500, width: "100%", margin: "12.5% 0" }}>
            <DataGrid disableExtendRowFullWidth={false} rows={rows} columns={columns} pageSize={5} />
        </div>
    );

}