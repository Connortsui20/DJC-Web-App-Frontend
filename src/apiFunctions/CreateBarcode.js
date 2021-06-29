import axios from 'axios';


export default async function CreateBarcode(jwtToken, barcodeNumber, time) {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    let barcode = {};
    let error = null;

    try {
        const { data } = await axios.post(`${BACKEND_URL}/barcodes/createbarcode`, { //* could change url in backend so make sure to change here as well
            delivery_note_number: barcodeNumber,
            submission_date: time, // user id comes from the back end now
        },
            {
                headers: { Authorization: `Bearer ${jwtToken}` }, //authentication
            }
        );
        console.log("%c Barcode scan post success: ", "color: green; font-weight: bold", data);
        barcode = data;
    } catch (err) {
        console.error("%c Unable to post barcode: ", "color: yellow; font-weight: bold", err);
        error = err;
    }

    return ({ //return object to use in App
        postBarcode: barcode,
        postError: error,
    });

}