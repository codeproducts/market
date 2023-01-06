import React from "react";
import Home from "./pages/Home/Home.jsx"
import {
    BrowserRouter as Router,
    Routes,
    Route
    
  } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import DataProvider from "./context/DataProvider";
import Addprod from "./pages/Addprod/Addprod";
import { Cart } from "./pages/Cart/Cart.jsx";
function App(){
    return(
        
    <DataProvider>
<Routes>
    <Route exact path="/" element={<Home/>}></Route> 


    <Route path="/login" element={<Login/>}></Route>


    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/add" element={<Addprod/>}></Route>
    <Route path="/cart" element={<Cart/>}></Route>
   </Routes>
   </DataProvider>
    )
}
export default App;