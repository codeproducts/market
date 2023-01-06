import React from "react";
import { IndividualProduct } from "./individualProduct";
import "./Products.scss";

export const Products=({products,addToCart})=>{
    console.log(products);
    return products.map((individualProduct)=>(
       <div className="indi"><IndividualProduct key={individualProduct.ID} individualProduct={individualProduct} addToCart={addToCart} /></div> 
    ))
    }

