import { Link } from "react-router-dom";
import "./navbar.scss"
import { useState,useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import {Icon} from 'react-icons-kit';
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import { auth } from "../../Config/Config";
import { useNavigate } from "react-router-dom";

const Navbar = ({user}) => {
 
  const history = useNavigate();

  function backgroundcolor(){
    document.getElementById("back").style.backgroundColor="black";
  }

  function backgroundcolorrevert(){
    document.getElementById("back").style.backgroundColor="#F7F7F7";
  }

  const handleLogout=()=>{
    auth.signOut().then(()=>{
      history('/login');
      document.getElementById("back").style.backgroundColor="black";
    }
    )
  }



  return (
    <div className="navbar">
    <div className="container">
        <div className="left">
            <Link className="link" to="/" onClick={backgroundcolorrevert}><img src="images/nile-low-resolution-logo-white-on-transparent-background.png" alt =""/></Link>
      
   

        </div>
        <div className="right">
        {!user&&<> <Link className="link" to="/login" onClick={backgroundcolor}>Login</Link></>}

        {user&&<><div><Link className="link" to="/" onClick={backgroundcolor}>{user}</Link></div>
        <Link className="link" to="/"  onClick={handleLogout}>Logout</Link>
        <Link to="/cart"><Icon icon={shoppingCart} size={20}></Icon></Link></>}  
        
 
        


            </div>
        </div>
        
    </div>
  )
}


export default Navbar;