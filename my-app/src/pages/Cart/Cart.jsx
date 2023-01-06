import React, { useEffect, useState } from "react"
import Navbar from "../../components/navbar/navbar"
import { auth, fs } from "../../Config/Config"
import "./Cart.scss"
import { CartProducts } from "./CartProducts"

export const Cart = () =>{
    
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

    const user = GetCurrentUser();
    
    const [cartProducts, setCartProducts]=useState([]);

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
            fs.collection('Cart'+user.uid).onSnapshot(snapshot=>{
                const newCartProduct = snapshot.docs.map((doc)=>({
                    ID: doc.id,
                    ...doc.data(),
                }));
                setCartProducts(newCartProduct)
            })
            }
            else{
                console.log('user not signed in');
            }
        })
    },[])

    let Product;

    const cartProductIncrease=(cartProduct)=>{
        //console.log(cartProducts);
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        //updating database
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart'+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('increment added')
                })
            }
            else{
                console.log("user is not logged in to increment");
            }
        })
    }

    //cart product decrease
    const cartProductDecrease = (cartProduct) =>{
        Product=cartProduct;
        if(Product.qty>1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
             //updating database
            auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart'+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('decrement')
                })
            }
            else{
                console.log("user is not logged in to increment");
            }
        })
        }

    }
    
    return(
        <div>
            <Navbar user={user}/>
            <br></br>
            {cartProducts.length<1&&(
                <div>
                    No Products to show
                </div>
            )}
            {cartProducts.length>0&&(
                
                    <div>
                        <br></br>
                        <br></br>
                        <h1>Cart</h1>
                        <div>
                            <CartProducts cartProducts={cartProducts}
                                cartProductIncrease={cartProductIncrease}
                                cartProductDecrease={cartProductDecrease}
                            />
                        </div>
                    </div>
                
            )}
        </div>
    )

}