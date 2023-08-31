import Login from "./Login/login";
import { React, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Items_display from "./items_display";
import Homepage from "./Homepage";
import Item_Details from "./item_details/item_details";
import Cart from "./Cart/cart";
import Order from "./Cart/Order";
import Admin from "./Admin/admin";
import AdminDisplay from "./Admin/admin_display";
import Admin_login from "./Login/admin_login";
import Admin_Product from "./Admin/admin_products";
function App() {
  var sum = 0;
  var flag = false;
  if (!localStorage[localStorage.CurrentEmail]) {
    flag = true;
  }
  const [cart_display_counter, setter] = useState(sum);
  const [search, Setsearch] = useState("");
  const [isloggedIn, set_isloggedIn] = useState(flag);

  useEffect(() => {
    if (localStorage[localStorage.CurrentEmail]) {
      var temp_arr = JSON.parse(localStorage[localStorage.CurrentEmail]);
      for (let i = 0; i < temp_arr.length; i++) {
        let { cart_counter } = temp_arr[i];
        sum = sum + cart_counter;
      }
    }
    setter(sum);
  }, flag);

  useEffect(() => {
    if (localStorage.isloggedIn) {
      set_isloggedIn(true);
    }
    console.log((localStorage.getItem("CurrentEmail")));

  }, []);



  return (
    <>
      <BrowserRouter>
        <Homepage
          isloggedIn={isloggedIn}
          set_isloggedIn={set_isloggedIn}
          cart_display_counter={cart_display_counter}
          search={search}
          Setsearch={Setsearch}
          flag={flag}
        />
        <Login set_isloggedIn={set_isloggedIn} tflag={flag} />
        <Switch>
          <Route exact path="/checkout">
            <Cart setter={setter} />
          </Route>
          <Route exact path="/">
            <Items_display search={search} />
          </Route>
          <Route exact path="/products/:id" component={Item_Details} />
          <Route exact path="/Order" component={Order} />
          <Route exact path="/admin_login" component={Admin_login}/>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin_product_listing" component={AdminDisplay}/>
          <Route exact path ="/admin_product_listing/products/:id" component={Admin_Product} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
