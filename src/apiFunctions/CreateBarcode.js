import axios from 'axios';


export default async function CreateBarcode(jwtToken, barcodeNumber, time) { //TODO have to make a try catch function instead to get the error as well

    const { data } = await axios
        .post("http://localhost:1337/barcodes/createbarcode", { //? could change url in backend so make sure to change here as well
            delivery_note_number: barcodeNumber,
            submission_date: time // user id comes from the back end now
        },
            {
                headers: { Authorization: `Bearer ${jwtToken}` }, //authentication
            }
        );

    return data;

}