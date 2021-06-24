import axios from 'axios';


export default async function GetData(jwtToken, pageNumber, pageSize) {

    let rows = [];
    let err = null;

    try {

        const [start, limit] = startEnd(pageNumber, pageSize)

        //TODO will eventually change url from the backend, make sure to change it here as well
        const { data } = await axios.get(`http://localhost:1337/barcodes/userbarcodes?start=${start}&limit=${limit}`, {
            headers: {
                Authorization:
                    `Bearer ${jwtToken}`
            },
        });
        //console.log("%c Data table", "color: green", data);

        rows = data.map(e =>
        ({
            id: e.id,
            delivery_note_number: e.delivery_note_number,
            submission_date: e.submission_date
        })
        );



    } catch (error) {
        err = error;
        rows = []; //? again probably dont need this but who knows
    }

    return {
        rows: rows,
        error: err
    };

}





function startEnd(pageNumber, pageSize) { // indexes from 0 so subtracted 1 from everything, but limit is exclusize so add 1 back
    const start = (pageNumber - 1) * pageSize; // + 1 - 1
    const end = pageNumber * pageSize; // - 1 + 1
    return ([start, end])
}