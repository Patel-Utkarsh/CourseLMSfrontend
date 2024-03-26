import "../NavBar/nav.css"
import logo from "../../images/logo-dark.svg"
import { FaSearch } from "react-icons/fa";

import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useState } from "react";
import ShoppingIcon from "./cartSystem/ShoppingIcon";
import ProfileIcon from "./cartSystem/profileIcon";
import { AppProvider } from "../../data";

const options = {
    position: 'absolute',
    right: '20px',
    top: '15px',
    color: 'black'
}





function Nav() {

    const {token,setToken} = useContext(AppProvider)
    return (
        <div className="NavContainer">
            <div className="LogoDiv">
                <Link to={'/'}>
                    <img id="logo" src={logo} alt="" />
                </Link>


            </div>
            <div className="SearchingDiv">
                <input type="text" placeholder="Search for anything" />
                <FaSearch style={options}></FaSearch>

            </div>

            <div className="ControlButtonDiv">

                {
                    token ?
                    <div className="userBtns">

                       <Link to={'/cart'}> <ShoppingIcon></ShoppingIcon> </Link>
                        <ProfileIcon></ProfileIcon>


                    </div> :

                        <div className="userBtns">
                            <Link to={'/login'}> <button id="loginBtn">Login</button> </Link>
                            
                            <Link to={'/signup'}>
                                <button id="signUpBtn">SignUp</button>
                            </Link>

                        </div>



                }




            </div>

        </div>

    )

}


export default Nav;