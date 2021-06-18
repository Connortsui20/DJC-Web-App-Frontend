import * as React from "react";
import { DataGrid } from '@material-ui/data-grid';


function DataTable ({rows}) {

    
    const columns = [
        { field: 'id', headerName: 'Deliver Note No.', align: "left", headerAlign: "left", width: "50%" },
        { field: 'SubmitTime', headerName: 'Submit Time', align: "right", headerAlign: "right", width: "50%" },
    ]; //this is just styling the header, column cells are styled in index.css

    

    

        return (
                <div style={{ height: 400, width: '100%', margin: "25% 0" }}>
                    <DataGrid disableExtendRowFullWidth={false} rows={rows} columns={columns} pageSize={5} />
                </div>
            );
        
}





export default DataTable;