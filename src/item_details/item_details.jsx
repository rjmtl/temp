import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./item_details.css";

export const Cart = React.createContext();

function Item_Details(props) {
  console.log("Item Details props", props.match.params.id);
  const [inCart, setInCart] = useState(false);
  const [currentItem, Set_currentItem] = useState([]);
  const [temp, setdata] = useState();
  // const [work,worker]=useState(search);
  useEffect(() => {
    if (props.match.params.id < 21) fetchdata();
    else {
      let index = props.match.params.id - 21;
      if (localStorage["Trial"]) {
        let arr = JSON.parse(localStorage["Trial"]);
        let item = arr[index];
        setdata(item);
      }
    }
  }, []);

  const fetchdata = async () => {
    const data = await fetch(
      `https://fakestoreapi.com/products/${props.match.params.id}`
    );
    const items = await data.json();
    console.log(items);
    setdata(items);
  };

  const cart_submitHandle = () => {
    var temp_product = temp;
    temp_product.cart_counter = 1;
    let tempCart = JSON.parse(localStorage[localStorage.CurrentEmail]);
    tempCart.push(temp_product);
    localStorage.setItem(localStorage.CurrentEmail, JSON.stringify(tempCart));
    props.history.push("/checkout");
  };

  useEffect(() => {
    // if(localStorage["Trial"]){
    // let adminArr=JSON.parse(localStorage["Trial"])
    document.querySelector(".login_button").classList.add("hidden");
    // }
    Set_currentItem(JSON.parse(localStorage[localStorage.CurrentEmail]));
    if (localStorage[localStorage.CurrentEmail]) {
      var temp_arr = props.location.state;
      let cart = JSON.parse(localStorage[localStorage.CurrentEmail]);
      for (let i = 0; i < cart.length; i++) {
        let temp = cart[i];
        if (temp) {
          if (temp.id === temp_arr.id) {
            setInCart(true);
            break;
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      localStorage.CurrentEmail,
      JSON.stringify(currentItem)
    );
  }, [currentItem]);

  return (
    <>
      {!temp ? (
        <img
          src="https://media.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif"
          className="loader"
        />
      ) : (
        <>
          <div className="product">
            <div className="product_details">
              <p className="detail_title">{temp.title}</p>
              <span className="price_detail">Special Price</span>
              <br />
              <span className="price_title">{`₹ ${temp.price}`}</span>
              <br />
              <br />
              <br />
              <span className="description_title">Description</span>
              <br />
              <p className="description_detail">{temp.description}</p>
            </div>
            <img src={temp.image} className="img" />
          </div>
          <div className="button_panel">
            {inCart ? (
              <button
                className="button_design"
                id="go_to_cart"
                onClick={() => {
                  props.history.push("/checkout");
                }}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="button_design"
                id="add_to_cart"
                onClick={cart_submitHandle}
              >
                🛒 Add to Cart
              </button>
            )}

            <button
              className="button_design"
              id="buy_now"
              onClick={cart_submitHandle}
            >
              ⚡ Buy Now{" "}
            </button>
          </div>
        </>
      )}
    </>
  );
}
export default withRouter(Item_Details);
