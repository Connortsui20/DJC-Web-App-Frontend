import axios from 'axios';


export default async function GetData(jwtToken, pageNumber, pageSize) {
    //requests barcode data from the api with the jwt Token, if token is valid  

    let rows = [];
    let err = null;
    const [start, limit] = startEnd(pageNumber, pageSize); //TODO figure out how to use this with DataTable.js material-ui DataGrid

    try { //request to access user barcodes with jwt Token
        const { data } = await axios.get(`http://localhost:1337/barcodes/userbarcodes?start=${start}&limit=${limit}`, {  //? might change url from the backend, make sure to change it here as well
            headers: {
                Authorization:
                    `Bearer ${jwtToken}`
            },
        });
        rows = data.map(e => ({ //only return barcode ID, note number, and submissions data.
            id: e.id,
            delivery_note_number: e.delivery_note_number,
            submission_date: e.submission_date,
        }) //userID comes from the back end and is specific to the user who is logged in
        );
    } catch (error) {
        err = error;
        rows = []; //? again probably dont need this but who knows
    }
    return { //return object to use in App
        rows: rows,
        error: err,
    };

}


function startEnd(pageNumber, pageSize) { // start counts from 1 so add (1)*, indexes from 0 so subtracted [- 1] from everything, but limit is exclusize so add 1** back
    const start = (pageNumber - 1) * pageSize; // (+ 1)* [- 1]; // +1 is based on counting
    const end = pageNumber * pageSize; // [- 1] + 1**
    return ([start, end])
}