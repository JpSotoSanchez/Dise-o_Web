import React from "react";
import "./Card.css";

function Card(props){
    const image="/images/"+props.poster;
    console.log(image);
    return(
        <div class="col-6 col-md-4">
                <div class="card">
                    <img src={image} alt={props.title} className="circle-img" />
                    <div class="card-body">
                        <h5 class="card-title">{props.title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">{props.year}</h6>
                        <a href="#" class="card-link">More...</a>
                    </div>
                </div>
            </div>
    );
}


export default Card;