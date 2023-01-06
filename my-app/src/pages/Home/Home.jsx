import React, { useEffect, useState } from "react";
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import Background from "../../components/background/background";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/navbar";
import { Products } from "../../components/products/Products";

import { auth, fs } from "../../Config/Config";

 const Home =(prop)=>{
    const history = useNavigate();
    function GetUserUid(){
        const [uid,setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(
                user=>{
                    if(user){
                        setUid(user.uid);
                    }
                }
            )
        },[])
        return uid;
    }   
        
    const uid = GetUserUid();

    

    function GetCurrentUser(){
        const[user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().fullname);
                    })
                }
                else{
                    setUser(null)
                }
            })
        },[])
        
        return user;

    }

    const [product,setProducts]=useState([]);
    const user = GetCurrentUser();

    const getProducts = async ()=>{
        const product = await fs.collection('Products').get();
        const productsArray = [];
        for (var snap of product.docs){
            var data = snap.data();
            data.ID= snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length===product.docs.length){
                setProducts(productsArray);
            }
        }
    }

    useEffect(()=>{
        getProducts();
    }
    ,[])

    let Product;
    const addToCart = (product) =>{
        if(uid!==null){
           Product=product;
           Product['qty']=1;
           Product['TotalProductPrice']=product.qty*product.price;
           fs.collection('Cart' + uid).doc(product.ID).set(Product).then(()=>{
            console.log("successfully added to cart")
           }
           )
        }
        else{
           
           history("/login")
        }
    }

    return(
        <div>
            <Navbar user={user}/>
            <Background/>
            <br></br>
            {product.length > 0 && (
                <div>

                    <div>
                        <Products products={product} addToCart={addToCart}/>
                    </div>
                </div>
            )}
            {
                product.length<1 && (
                    <div>
                        please wait ...
                    </div>
                )
            }
            <Footer/>

        </div>
    )
}
export default Home;