import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import { Button } from "antd";
import axios from "axios";
import Loginstore from "../mobx/loginstore";
const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const [ismodalvisible, setIsModalVisible] = useState(false);
  const [id, setid] = useState("");
  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [rating, setrating] = useState("");
  const [loading, setLoading] = useState(false);
  const Openmodal = () => {
    setIsModalVisible(true);
  };

  function closemodal() {
    setIsModalVisible(false);
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
            width = width * ratio;
            height = height * ratio;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          setimage(resizedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const Uploaddata = async (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      id: Number(id),
      title,
      price,
      description,
      category,
      image,
      rating,
    };
    console.log(payload, "check");
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        payload,
      );
      console.log(response);
      setLoading(false);
      setIsModalVisible(false);
    } catch (error) {
      console.error(error, "error fetching data");
      setLoading(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        {
          Loginstore.Adminadd!==true ? (

     
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          {" "}
          Shoe's Store
        </NavLink>
            ):(
              <div  className="navbar-brand fw-bold fs-4 px-2" >Welcome Back Admin</div>
            )
          }
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closemodal} >
                Home{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product" onClick={closemodal} >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={closemodal} >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                onClick={() => closemodal()}
              >
                Contact
              </NavLink>
            </li>
            {Loginstore.Adminadd === true && (
              <li>
                <button
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    color: "gray",
                    marginTop: "7px",
                  }}
                  onClick={() => {
                    Openmodal();
                  }}
                >
                  Post Data
                </button>
              </li>
            )}
          </ul>
          <div className="buttons text-center">
            <NavLink
              to="/login"
              className="btn btn-outline-dark m-2"
              onClick={closemodal}
            >
              <i className="fa fa-sign-in-alt mr-1"></i> Login
            </NavLink>
            <NavLink
              to="/cart"
              className="btn btn-outline-dark m-2"
              onClick={closemodal}
            >
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}
              ){" "}
            </NavLink>
          </div>
        </div>
      </div>

      <ReactModal isOpen={ismodalvisible} onRequestClose={closemodal}>
        <div className="row my-4 h-10">
          <h3 style={{ padding: "10px" }}>Publish your new product admin</h3>
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={Uploaddata}>
              <div className="my-3">
                <label htmlFor="id">Product ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  value={id}
                  onChange={(e) => setid(e.target.value)}
                  required
                  placeholder="Enter your product id"
                />
              </div>

              <div className="my-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  required
                  placeholder="Enter your title"
                />
              </div>

              <div className="my-3">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  required
                  placeholder="Enter your price"
                />
              </div>

              <div className="my-3">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                  required
                  placeholder="Enter your category"
                />
              </div>

              <div className="my-3">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  required
                  placeholder="Enter your description"
                />
              </div>

              <div className="my-3">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={handleImageChange}
                  required
                />
              </div>

              <div className="my-3">
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  className="form-control"
                  id="rating"
                  value={rating}
                  onChange={(e) => setrating(e.target.value)}
                  required
                  placeholder="Enter your rating"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onLoad={loading}
              >
                Upload Data
              </button>
            </form>
          </div>
        </div>
      </ReactModal>
    </nav>
  );
};

export default Navbar;
