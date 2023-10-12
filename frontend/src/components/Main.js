import React from "react";
import {Link} from "react-router-dom";


function Main() {
    return (
        <div>
            <Link to="/">
                <button>Выйти</button>
            </Link>
        </div>
    );
}

export default Main;