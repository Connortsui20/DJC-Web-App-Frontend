import axios from 'axios';


export default async function LoginGetToken(jwtToken) {
    try {

        const pageNumber = 1; //!User input here
        const pageSize = 10;
        const [start, limit] = startEnd(pageNumber, pageSize)


        const { data } = await axios.get(`http://localhost:1337/barcodescans/userbarcodes?start=${start}&limit=${limit}`, {
            headers: {
                Authorization:
                    `Bearer ${jwtToken}`
            },
        });
        console.log("%c Data table", "color: green", data);

    } catch (error) {
        console.log(error);
    }

    

}





function startEnd (pageNumber, pageSize) { // indexes from 0 so subtracted 1 from everything, but limit is exclusize so add 1 back
    const start = (pageNumber-1)*pageSize; // + 1 - 1
    const end = pageNumber*pageSize; // - 1 + 1
    return([start, end])
}