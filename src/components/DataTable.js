import * as React from "react";
import { DataGrid } from '@material-ui/data-grid';

const columns = [
        { field: 'id', headerName: 'Deliver Note No.', align: "left", headerAlign: "left", width: "50%" },
        { field: 'SubmitTime', headerName: 'Submit Time', align: "right", headerAlign: "right", width: "50%" },
    ]; //this is just styling the header, column cells are styled in index.css

    const rows = [
    { id: 1, SubmitTime: '00:00'},
    { id: 2, SubmitTime: '00:00'},
    { id: 3, SubmitTime: '00:00'},
    { id: 4, SubmitTime: '00:00'},
    { id: 5, SubmitTime: '00:00'},
    { id: 6, SubmitTime: '00:00'},
    { id: 7, SubmitTime: '00:00'},
    { id: 8, SubmitTime: '00:00'},
    { id: 9, SubmitTime: '00:00'},
    { id: 10, SubmitTime: '00:00'},
    { id: 11, SubmitTime: '00:00'},
    { id: 12, SubmitTime: '00:00'},
];


function DataTable () {


        return (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid disableExtendRowFullWidth={false} rows={rows} columns={columns} pageSize={5} />
                </div>
            );
        
}





export default DataTable;