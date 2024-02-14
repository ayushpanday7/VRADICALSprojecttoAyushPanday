import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './NavBar.css'
import coinSet from "./coinSet";


// this will help to navigate to different different pages of our page
function NavBar() {
    const { coins } = useContext(coinSet);
    return (
        <div className="naviation">
            <div className="navContainer">
                <Link className="navlink" to="/">
                    <span className="material-symbols-outlined">Devices</span>
                    <div className="navContent">Deshboard</div>
                </Link>
                <Link className="navlink" to="/Shop">
                    <span className="material-symbols-outlined">local_mall</span>
                    <div className="navContent">Shop</div>
                </Link>
                <Link className="navlink" to="/Login">
                    <span className="material-symbols-outlined">account_circle</span>
                    <div className="navContent">Account</div>
                </Link>
                <Link className="navlink" to="/Admin">
                <span class="material-symbols-outlined">admin_panel_settings</span>
                    <div className="navContent">Admin</div>
                </Link>
            </div>
            <div className="naviationLogo">
                <Link className="navlink coinDisplay" to="/BuyCoins">
                    <span className="material-symbols-outlined">
                        monetization_on
                    </span>
                    {coins.coin}
                </Link>
            </div>
        </div>
    )
}
export default NavBar;
