import { withRouter } from "react-router-dom";
import { useEffect } from "react";
import "./Login/login.css";

function Homepage({
  isloggedIn,
  set_isloggedIn,
  search,
  Setsearch,
  cart_display_counter,
  history,
  flag,
})
{


  return (
    <div className="App">
      <div className="navbar">
        <button
          className="flipkart_logo"
          onClick={() => {
            history.push("/");
          }}
        ></button>

          <input
            name="search"
            className="search_bar"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={(e) => Setsearch(e.target.value)}
          ></input>
<div className="login_cart">
          {isloggedIn ? (
            <button
              className="login_button"
              name="logout"
              onClick={() => {
                localStorage.removeItem("CurrentUser");
                localStorage.removeItem("CurrentEmail");
                localStorage.removeItem("isloggedIn");
                set_isloggedIn(false);
                alert("Logged Off");
                history.push("/");
                flag = true;
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="login_button"
              name="login"
              onClick={() => {
                document.querySelector(".login").classList.add("visible");
                document.querySelector("body").classList.toggle("modal-open");
              }}
            >
              Login
            </button>
          )}

          <div className="cart_value_display">{cart_display_counter}</div>

          <button
            onClick={() => {
              history.push("/checkout");
            }}
            className="cart"
          >
            🛒 Cart
          </button>
        </div>
        <div className="admin_logout">
          <button className="login_button" onClick={()=>{
              alert("Logged Off Successfully");
              history.push("/admin_login");
              localStorage.removeItem("isAdminLoggedIn");
              document.querySelector(".admin_logout").classList.remove("visible");
          }}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Homepage);
