import React from "react";
import "./Products.scss";
export const IndividualProduct = ({individualProduct,addToCart}) =>{
    console.log(individualProduct);
    
    const handleAddToCart=()=>{
        addToCart(individualProduct);
    }
    
    return(

        <section class="section-products">
		<div class="container">
				
				<div class="row"></div>
                <div class="col-md-6 col-lg-4 col-xl-3" id="prod">
								<div id="product-1" class="single-product">
										<div class="part-1">
                                                <img className="background" src={individualProduct.url} alt="product-img"></img>
												<ul>
														<li><a href="#" onClick={handleAddToCart}><i class="fas fa-shopping-cart"></i></a></li>

												</ul>
										</div>
										<div class="part-2">
												<h3 class="product-title">{individualProduct.title}</h3>

											     <h4 class="product-price">{individualProduct.price}/-</h4>
										</div>
								</div>
						</div>
        </div>
        </section>

    )
}