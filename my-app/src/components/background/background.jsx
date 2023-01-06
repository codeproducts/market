import React from "react";
import "./background.scss";
function Background() {
    return (
        <div>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/bag.png" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="images/plant.png" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="images/nailpo.png" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <div className="twoimages">
                    <img src="images/pot.jpg" className="firstphoto" alt="asthetic"></img>
                    <img src="images/camera.jpg" className="secondphoto" alt="asthetic"></img>
                </div>
                <div className="quote">

                </div>
                 <b><div className="content">Our Products :-</div></b>
            </div>


            
        </div>
    )
}

export default Background;