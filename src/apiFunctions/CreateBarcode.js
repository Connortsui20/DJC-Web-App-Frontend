import axios from 'axios';


export default async function CreateBarcode(jwtToken, barcodeNumber, time) {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

     return await axios
        .post(`${BACKEND_URL}/barcodes/createbarcode`, { //! could change url in backend so make sure to change here as well
            delivery_note_number: barcodeNumber,
            submission_date: time, // user id comes from the back end now
        },
            {
                headers: { Authorization: `Bearer ${jwtToken}` }, //authentication
            }
        ); //the error is caught on the app side

}