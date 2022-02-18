import React from 'react'
import { useState } from 'react';
import '../styles/Header.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


function Header() {
    const [ct, setct] = useState(false);
    const history = useHistory();

    const onburger = () => {
        setct(!ct);
    }

    return (
        <div>
            <nav className={ct ? "addme" : "removeme"}>
                <Link to="/">  <a className={ct ? "visible" : "not-visible"}>Home</a> </Link>
                <Link to="/about">  <a className={ct ? "visible" : "not-visible"}>About</a> </Link>
                <Link to="/contact">  <a className={ct ? "visible" : "not-visible"}>Contact</a> </Link>
                <Link to="/support">  <a className={ct ? "visible" : "not-visible"}>Support Us</a> </Link>
                <Link to='/login'> <a className={ct ? "visible" : "not-visible"}>Login</a></Link>
                <div className="animation start-home view"></div>

                <div className="burger" onClick={onburger}>
                    <GiHamburgerMenu color='black' size={40} className={ct ? "not-visible" : ""} />
                    <AiOutlineClose color='black' size={40} className={ct ? "" : "not-visible"} />
                </div>
            </nav>
        </div>
    )
}

export default Header;

