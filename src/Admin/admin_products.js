import React from "react";
import { useState,useEffect } from "react";
import "./../item_details/item_details.css"

function Admin_Product(props)
{
    let temp=[];
let id=props.match.params.id;
    if(localStorage["Trial"]);
    let arr=JSON.parse(localStorage["Trial"]);
temp=arr[id];
useEffect(() => {
    document.querySelector(".login_cart").classList.add("hidden");
    document.querySelector(".admin_logout").classList.add("visible");

}, [])
return(
     <>
  <div className="product">
            <div className="product_details">
              <p className="detail_title">{temp.title}</p>
              <span className="price_detail">Special Price</span>
              <br />
              <span className="price_title">{`₹ ${temp.price}`}</span>
              <br />

              <span className="description_title">Description</span>
              <br />
              <p className="description_detail">{temp.description}</p>
            </div>
            <img src={temp.image} className="img" />
          </div>
</>

)
}

export default Admin_Product;