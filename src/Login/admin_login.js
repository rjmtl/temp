import React, { useState, useEffect } from "react";

function Admin_login(props) {
  var temp_Arr = [];
  var flag = false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(props);

  if (localStorage["admin_credentials"])
    temp_Arr = JSON.parse(localStorage["admin_credentials"]);
    console.log(temp_Arr)
  const Submithandle = (e) => {
      console.log(temp_Arr);
    e.preventDefault();
    const data = {
      email,
      password,
    };
    // localStorage.setItem("admin_credentials",JSON.stringify(data))
    console.log(data);
    let temp=temp_Arr;

// console.log(data.email,data.password);
for(let i=0;i<temp_Arr.length;i++){
temp=temp_Arr[i];
console.log(temp.email,temp.password);

      if (temp.email === data.email && temp.password === data.password){
          console.log("true");
        flag = true;
      }
    }
    if (flag) {
      alert("Logged In Successfully");
    props.history.push("/admin");
    localStorage.setItem("isAdminLoggedIn",true);
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid Password");
    }
  };

  useEffect(() => {
      document.querySelector(".login_cart").classList.add("hidden");
      document.querySelector(".admin_logout").classList.remove("visible");

  }, [])
  return (
    <>
      <div className="admin_main">
        <div className="admin_login_main">
          <div className="login_inner">
            <div className="login_visible">
              <span className="login_span">Admin Login</span>
              <div className="graphic"></div>
            </div>
            <div className="login_console">
              <div className="inner_login_panel">
                <form className="no" onSubmit={(e) => Submithandle(e)}>
                  <input
                    className="login_email"
                    type="text"
                    name="email"
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
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <br />
                  <br />
                  <br/>
                  <button className="login_panel_button">Admin Login</button>
                  <br/>
                  <br/>
                  <button type="button" className="login_panel_button" onClick={()=>{
                    props.history.push("/");

                  }}>Login as User</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_login;
