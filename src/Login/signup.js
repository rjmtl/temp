import { useState, useEffect } from "react";
function Signup() {
  var temp_data = [];
  if (localStorage.UserInfo && localStorage.UserInfo.length)
    temp_data = JSON.parse(localStorage.UserInfo);

  const [value, set] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setname] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [data_Arr, setter] = useState(temp_data);
  var data = {
    username,
    email,
    password,
    confirmpassword,
  };
  var error;

  const [validation_error, setError] = useState();
  const [email_Err, set_email_Err] = useState();
  const [pw_Err, set_pw_Err] = useState();
  const [cpw_Err, set_cpw_Err] = useState();
  const signup_submit_handle = (e) => {
    e.preventDefault();
    let exisemail = false;
    console.log(e);
    data = {
      username,
      email,
      password,
      confirmpassword,
    };
    setError(error);
    let isValid = validate();
    // if (data.name.test())
    var flag = false;
    for (let i = 0; i < temp_data.length; i++) {
      let temp = temp_data[i];
      if (temp.email === data.email) {
        flag = true;
      }
    }
    {
      if (flag === false) {
        exisemail = true;
      } else {
        alert("Email already exist!");
      }
    }
    if (exisemail && isValid) {
      setter([...data_Arr, data]);
      alert("Signed Up Successfully");
      setname("");
      setEmail("");
      setPassword("");
      setconfirmpassword("");
      document.querySelector(".inner_signup_panel").classList.remove("visible");
      document.querySelector(".inner_login_panel").classList.remove("hidden");
      document.querySelector(".signup_visible").classList.remove("visible");
      document.querySelector(".login_visible").classList.remove("hidden");
    }
  };

  const validate = () => {
    let Err = {
      validation_Err: "",
      email_Err: "",
      pwErr: "",
      cpwErr: "",
    };

    error = { ...data };

    let { username: name, email, password, confirmpassword } = error;

    {
      if (name.length === 0) {
        Err.validation_Err = "Name can't be empty";
        error.name = false;
        setError(Err.validation_Err);
      } else if (name.includes(" ")) {
        Err.validation_Err = "Spaces aren't Allowed";
        error.name = false;
        setError(Err.validation_Err);
      } else if (!name.match("^[A-Za-z]+$")) {
        Err.validation_Err = "Only Alphabets are allowed";
        error.name = false;
        setError(Err.validation_Err);
      } else {
        error.name = true;
        Err.validation_Err = "";
        setError(Err.validation_Err);
      }
    }
    {
      if (email.length === 0) {
        Err.email_Err = "This can't be blank";
        error.email = false;
      } else if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        Err.email_Err = "";
        error.email = true;
      } else {
        Err.email_Err = "Invalid Email";
        error.email = false;
      }
      set_email_Err(Err.email_Err);
    }
    {
      if (!password.match("(?=.*[0-9])")) {
        Err.pwErr = "Should contain atleast one number";
        error.password = false;
      } else if (!password.match("(?=.*[A-Z])")) {
        Err.pwErr = "Should contain atleast one capital letter";
        error.password = false;
      } else if (!password.match("(?=.*[a-z])")) {
        Err.pwErr = "Should contain atleast one small letter";
        error.password = false;
      } else if (!password.match("(?=.*[!@#$%^&*])")) {
        Err.pwErr = "Should contain atleast one special character";
        error.password = false;
      } else {
        Err.pwErr = "";
        error.password = true;
      }
      set_pw_Err(Err.pwErr);
    }

    {
      if (confirmpassword === password) {
        Err.cpwErr = "";
        error.confirmpassword = true;
      } else {
        Err.cpwErr = "Passwords Doesn't Match";
        error.confirmpassword = false;
      }
      set_cpw_Err(Err.cpwErr);
    }
    let isvalid =
      error.name && error.email && error.password && error.confirmpassword;
    return isvalid;
  };

  useEffect(() => {
    localStorage.setItem("UserInfo", JSON.stringify(data_Arr));
  }, [data_Arr]);

  return (
    <div className="inner_signup_panel">
      <form className="no" onSubmit={signup_submit_handle}>
        <input
          minLength="2"
          className="login_email"
          type="text"
          placeholder="Name"
          name="username"
          id="username"
          value={username}
          required
          onChange={(e) => setname(e.target.value)}
        />

        {validation_error ? (
          <>
            <br></br>
            <span className="error">{validation_error}</span>
          </>
        ) : null}

        <br />
        <br />

        <input
          className="login_email"
          type="email"
          placeholder="Enter Email"
          name="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {email_Err ? (
          <>
            <br></br>
            <span className="error">{email_Err}</span>
          </>
        ) : null}

        <br />
        <br />

        <input
          minLength="8"
          className="login_password"
          placeholder="Enter Password"
          type="password"
          name="password"
          id="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {pw_Err ? <span className="error">{pw_Err}</span> : null}
        <br />
        <br />
        <input
          className="login_password"
          placeholder="Confirm Password"
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          value={confirmpassword}
          required
          onChange={(e) => setconfirmpassword(e.target.value)}
        />
        {cpw_Err ? <span className="error">{cpw_Err}</span> : null}
        <br />
        <br />

        <button className="login_panel_button">Signup</button>
        <br />
        <button
          type="button"
          className="existing_user"
          onClick={() => {
            document
              .querySelector(".inner_signup_panel")
              .classList.remove("visible");
            document
              .querySelector(".inner_login_panel")
              .classList.remove("hidden");
            document
              .querySelector(".signup_visible")
              .classList.remove("visible");
            document.querySelector(".login_visible").classList.remove("hidden");
          }}
        >
          Existing User? Log in
        </button>
      </form>
    </div>
  );
}

export default Signup;
