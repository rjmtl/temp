import "./cart.css";
import { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";

function Cart({setter,history}) {
  var sum = 0;
  var cart_sum = 0;
console.log(history);
  const [cart_data, setcart] = useState([]);

  if (localStorage[localStorage.CurrentEmail]) {
    var cart = JSON.parse(localStorage[localStorage.CurrentEmail]);
    for (let i = 0; i < cart_data.length; i++) {
      var p = cart_data[i];
      let { price, cart_counter } = p;
      let total = price * cart_counter;
      sum = sum + total;
      cart_sum = cart_sum + cart_counter;
    }
  }
  const remove_handle = (index) => {
    cart.splice(index, 1);
    localStorage.setItem(localStorage.CurrentEmail, JSON.stringify(cart));
    setcart(cart);
  };

  const increment_counter = (index) => {
    cart[index]["cart_counter"]++;
    localStorage.setItem(localStorage.CurrentEmail, JSON.stringify(cart));
    setcart(cart);
  };

  const decrement_counter = (index) => {
    cart[index]["cart_counter"]--;
    localStorage.setItem(localStorage.CurrentEmail, JSON.stringify(cart));
    setcart(cart);
  };

  const decrement_handler = (value) => {
    if (value.cart_counter <= 1) {
      return true;
    } else return false;
  };

  useEffect(() => {
    setter(cart_sum);
  }, cart);

  useEffect(() => {
    if (localStorage[localStorage.CurrentEmail]) {
      var arr = JSON.parse(localStorage[localStorage.CurrentEmail]);
      setcart(arr);
    }
    document.querySelector(".login_button").classList.add("hidden");
  }, []);

  return (
    <>
      <div className="main">
        <div className="cart_div">
          <div className="my_cart">
            <span>{`My cart (${cart_data.length})`}</span>
          </div>
          <br />
          <hr className="hr" />

          {cart_data.map((value, index) => (
            <>
              <div className="cart_display">
                <div className="cart_image">
                  <img className="cart_image_display" src={value.image}></img>
                  <div className="counter_div">
                    <button
                      className="counter"
                      disabled={decrement_handler(value)}
                      onClick={() => {
                        decrement_counter(index);
                      }}
                    >
                      -
                    </button>
                    <button className="counter_display">
                      {value.cart_counter}
                    </button>
                    <button
                      className="counter"
                      onClick={() => {
                        increment_counter(index);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart_details">
                  <p className="display_details">{value.title}</p>
                  <p className="display_details">Seller</p>
                  <p className="display_details_price">{`₹ ${value.price}`}</p>
                  <button
                    className="remove_button"
                    onClick={() => {
                      remove_handle(index);
                    }}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
              <hr className="hr" />
            </>
          ))}
        </div>
        <div className="price">
          <span className="cart_price_title">PRICE DETAILS</span>
          <div className="price_card">
            <br />
            <span className="price_item">{`Price (${cart_data.length} item)`}</span>
            <span className="total_price">{`₹ ${sum
              .toString()
              .slice(0, 15)}`}</span>
            <br />
          </div>
          <br />
          <div>
            <span className="price_item">Delivery Charges</span>
            <span className="total_delivery">FREE</span>
            <br />
            <br />

            <span className="price_item">
              ------------------------------------------------
            </span>
            <br />
            <br />

            <span className="final_price">Total</span>
            <span className="price_total">{`₹ ${sum
              .toString()
              .slice(0, 15)}`}</span>
          </div>
        </div>
        <div className="placeorder" onClick={()=>history.push("/Order")}>
          <p className="placeyourorder">Place Your Order</p>
        </div>
      </div>
    </>
  );
}

export default withRouter(Cart);
