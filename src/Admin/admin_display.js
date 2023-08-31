import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./admin.css";

function AdminDisplay(props) {
  var arr = JSON.parse(localStorage["Trial"]);
  const [item, setItem] = useState(arr);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [buttonVal, setter] = useState("");

  const [products, setProducts] = useState([]);

  const image_handle = (e) => {
    var image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      image = reader.result;
      setImage(image);
    };
  };

  const submithandle = (e) => {
    e.preventDefault();
    var data = {
      title: name,
      price,
      image,
      description: desc,
    };

    document.querySelector(".main_product").classList.remove("visible");
    arr[buttonVal] = data;
    console.log(arr);
    localStorage.setItem("Trial", JSON.stringify(arr));
    setProducts(arr);
  };

  const edithandle = (value, index) => {
    setName(value.title);
    setPrice(value.price);
    setDesc(value.description);
    setImage(value.image);
    setter(index);
    document.querySelector(".main_product").classList.add("visible");
  };

  const deletehandle = (index) => {
    arr.splice(index, 1);
    localStorage.setItem("Trial", JSON.stringify(arr));
    setProducts(arr);
  };

  useEffect(() => {
    if (!localStorage["isAdminLoggedIn"]) {
      props.history.push("/admin_login");
    }
    document.querySelector(".login_cart").classList.add("hidden");
    document.querySelector(".admin_logout").classList.add("visible");
  }, []);


  return (
    <> 

      
      <div className="main_product">
        <br />
        <span
          className="close"
          onClick={() => {
            document.querySelector(".main_product").classList.remove("visible");
          }}
        >
          x
        </span>

        <form
          className="add_product"
          onSubmit={(e) => {
            submithandle(e);
          }}
        >
          <label className="label">Product Title</label>
          <br />
          <input
            className="product_prop"
            value={name}
            // placeholder="Name of Product"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label className="label">Price</label>
          <br />
          <input
            className="product_prop"
            value={price}
            // placeholder="Price in INR"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label className="label">Description</label>
          <br />
          <input
            className="product_prop"
            value={desc}
            // placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <br />
          <label className="label">Product Image</label>
          <br />
          <input
            type="file"
            className="product_prop"
            accept="image/gif, image/jpeg, image/png"
            name="image"
            id="file"
            required
            files={image}
            // value={image}
            onChange={(e) => image_handle(e)}
          />

          <br />
          <button className="button" type="submit">
            Save
          </button>
        </form>
      </div>

      <div className="main_admin">
        {arr.map((value, index) => (
          <div className="Admin_Display">

            <img src={value.image} className="image" />
            <br/>
            <span className="display_title">{value.title}</span>
            <br />
            <span className="display_details_price">{`₹ ${value.price}`}</span>
            <br />
            <br/>
            <button
              className="edit_buttons"
              onClick={() => {
                deletehandle(index);
                document.querySelector("#snackbar").classList.add("show");
                setTimeout(()=>{document.querySelector("#snackbar").classList.remove("show");},3000)
              }}
            >
              Delete
            </button>
            <button
              className="edit_buttons"
              id="edit"
              onClick={() => {
                edithandle(value, index);
                document.querySelector("body").classList.toggle("modal-open");
              }}
            >
              Edit{" "}
            </button>
            <br />
            {/* </Link> */}

          </div>

        ))}
            {/* <div className="floating_desc"></div> */}
          <div id="snackbar">Deleted</div>
      </div>
              </>
  );
}

export default AdminDisplay;
