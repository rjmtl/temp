import "./login.css";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Signup from "./signup";

function Login(props) {
  var temp_data = [];

  var name;
  if (localStorage.UserInfo && localStorage.UserInfo.length)
    temp_data = JSON.parse(localStorage.UserInfo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data_Arr, setter] = useState(temp_data);
  const submithandle = (e) => {
    var flag = false;
    e.preventDefault();
    const value = {
      email: email,
      password: password,
    };
    for (let i = 0; i < temp_data.length; i++) {
      let temp = temp_data[i];

      if (value.email === temp.email && value.password === temp.password) {
        flag = true;

        localStorage.setItem("CurrentUser", temp.username);
        localStorage.setItem("CurrentEmail", temp.email);
        localStorage.setItem("isloggedIn", true);
        props.set_isloggedIn(true);

        name = temp.username;
        break;
      }
    }

    if (flag) {
      alert(`Welcome ${name}`);
      props.set_isloggedIn(true);
      document.querySelector(".login").classList.remove("visible");
    } else {
      alert("Invalid User");
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setter(JSON.parse(localStorage["UserInfo"]));
  }, []);

  return (

    <div className="login">
      <div className="login_main">
        <div className="login_signup">
          <span
            className="cross"
            onClick={() => {
              document.querySelector(".login").classList.remove("visible");
            }}
          >
            x
          </span>
          <div className="login_inner">
            <div className="login_visible">
              <span className="login_span">Login</span>
              <span className="recommendation_tag">
                Get access to your Orders, Wishlist and Recommendations
              </span>
            </div>

            <div className="signup_visible">
              <span className="login_span">Looks like you're new here!</span>

              <span className="signup_tag">
                Signup with your email to get started
              </span>
            </div>
            <div className="graphic"></div>
          </div>

          <div className="login_console">
            <div className="inner_login_panel">
              <form className="no" onSubmit={submithandle}>
                <input
                  className="login_email"
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter Email"
                />

                <br />
                <br />

                <input
                  className="login_password"
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <br />
                <span className="tnc">
                  By continuing, you agree to Flipkart's Terms of Use and
                  Privacy Policy.
                </span>
                <br />
                <br />
                <button className="login_panel_button">Login</button>
                <br />
                <br />
                <button type="button" onClick={()=>{
                  props.history.push("/admin");
                  document.querySelector(".login").classList.remove("visible");

                }} className="login_panel_button">Admin Login</button>
              </form>

              <button
                type="button"
                className="signup"
                onClick={() => {
                  document
                    .querySelector(".inner_signup_panel")
                    .classList.add("visible");
                  document
                    .querySelector(".inner_login_panel")
                    .classList.add("hidden");
                  document
                    .querySelector(".signup_visible")
                    .classList.add("visible");
                  document
                    .querySelector(".login_visible")
                    .classList.add("hidden");
                }}
              >
                New to Flipkart? Create an account
              </button>
            </div>
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
