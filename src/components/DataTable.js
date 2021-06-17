import * as React from "react";
import { DataGrid } from '@material-ui/data-grid';


function DataTable () {

    
    const columns = [
        { field: 'id', headerName: 'Deliver Note No.', align: "left", headerAlign: "left", width: "50%" },
        { field: 'SubmitTime', headerName: 'Submit Time', align: "right", headerAlign: "right", width: "50%" },
    ]; //this is just styling the header, column cells are styled in index.css

    const rows = [
        { id: "001", SubmitTime: '00:00' },
        { id: "002", SubmitTime: '00:00' },
        { id: "003", SubmitTime: '00:00' },
        { id: "004", SubmitTime: '00:00' },
        { id: "005", SubmitTime: '00:00' },
        { id: "006", SubmitTime: '00:00' },
        { id: "007", SubmitTime: '00:00' },
        { id: "008", SubmitTime: '00:00' },
        { id: "009", SubmitTime: '00:00' },
        { id: "010", SubmitTime: '00:00' },
        { id: "011", SubmitTime: '00:00' },
        { id: "012", SubmitTime: '00:00' },
    ];

    rows.push({ id: "013", SubmitTime: '00:00' }) //how to add to rows

        return (
                <div style={{ height: 400, width: '100%', margin: "25% 0" }}>
                    <DataGrid disableExtendRowFullWidth={false} rows={rows} columns={columns} pageSize={5} />
                </div>
            );
        
}





export default DataTable;