import React from "react";


export default class NonExistentPage extends React.Component {
    render() {
        return (
            <div>
                {" Something bad happened... "}
                <h1>404</h1> <p>Page doesn't exist</p>
            </div>
        );
    }
}
