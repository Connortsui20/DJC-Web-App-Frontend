import axios from 'axios';


export default async function CreateBarcode(jwtToken, barcodeNumber, time) {

    //barcodeNumber 

    const { data } = await axios
        .post("http://localhost:1337/barcodes/createbarcode", //TODO change the url in the backend to a custom one
            {
                delivery_note_number: barcodeNumber,
                //users_permissions_user: {id:userID}, // user id comes from the back end now
                submission_date: time //TODO figure out the time
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${jwtToken}`,
                },
            }

        );

    return data;







}