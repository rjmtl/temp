import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, withRouter } from "react-router-dom";
import { CartConsumer } from "./Context/CartContext";

function Items_display({ search }) {
  var tempItem;
  var temparr = [];
  if (localStorage["Trial"]) {
    temparr = JSON.parse(localStorage["Trial"]);
  }
  var arr;
  const [admin_data, setter] = useState(temparr);
  console.log(admin_data);
  const [item, setItem] = useState();
  // const [temp,Setter]=

  const initialProductsSet = (items) => {
    tempItem = items;
  };
  useEffect(() => {
    fetchdata();
    tempItem = item;
    console.log(search);
  }, []);

  const fetchdata = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const items = await data.json();
    setItem(items);
  };

  useEffect(() => {
    let temp_prodct_arr = item;
    if (item) {
      let searchedItems = temp_prodct_arr.filter((value, index, itemArr) =>
        value.title.toLowerCase().match(search.toLowerCase())
      );
      console.log(searchedItems);
      setItem(searchedItems);
      console.log(item);
    }
  }, [search]);

  if (item) {
    arr = item.concat(admin_data);
    // setItem(arr);
  }

  useEffect(() => {
    document.querySelector(".login_cart").classList.remove("hidden");
    document.querySelector(".admin_logout").classList.remove("visible");
    document.querySelector(".login_button").classList.remove("hidden");
    //     fetch("https://amazon-price1.p.rapidapi.com/upcToAsin?marketplace=ES&upc=%3CREQUIRED%3E", {
    // 	"method": "GET",
    // 	"headers": {
    // 		"x-rapidapi-key": "47746fd695msha4342db14c28a4ap1d775fjsnba196ad0c838",
    // 		"x-rapidapi-host": "amazon-price1.p.rapidapi.com"
    // 	}
    // })
    // .then(response => {
    // 	console.log(response);
    // })
    // .catch(err => {
    // 	console.error(err);
    // });
  }, []);

  return (
    <>
      {!arr ? (
        <img
          src="https://media.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif"
          alt="loading"
          className="loader"
        />
      ) : (
        <div className="itemList">
          {arr.map((value, index) => (
            <Link
              to={{
                pathname: `/products/${index + 1}`,
                state: value,
              }}
              style={{ textDecoration: "none" }}
            >
              <div className="items">
                <img src={value.image} className="image_display" />

                <p className="main_display_title">
                  {value.title.slice(0, 59)}{" "}
                </p>
                <p className="main_display_price">{`₹ ${value.price}`}</p>
                <br />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default withRouter(Items_display);
