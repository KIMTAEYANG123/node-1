import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registry">Registry</Link></li>
            </ul>
            <hr/>
        </div>
    )
}

export default NavBar
