import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    zip: "",
    quantity: cartItems.reduce((total, item) => total + item.qty, 0),
    image: cartItems.length > 0 ? cartItems[0].image : "",
    price: cartItems.length > 0 ? cartItems[0].price : 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setOrderSuccess(true);

    const phoneNumber = "923004844897";
    const whatsappMessage = `Hello, my name is ${formData.firstName} ${formData.lastName}.
My email is ${formData.email}.
My Address is ${formData.address}, ${formData.state}, ${formData.country}, ${formData.zip}.
I want to buy this product:
🔹 *Product:* ${formData.image}
🔹 *Price:* $${formData.price}
🔹 *Quantity:* ${formData.quantity}

🖼 *Product Image:* ${formData.image}
`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );

    setTimeout(() => setOrderSuccess(false), 5000);
  };

  const EmptyCart = () => (
    <div className="container text-center py-5">
      <h4 className="display-5">No item in Cart</h4>
      <Link to="/" className="btn btn-outline-dark mt-3">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </div>
  );

  const ShowCheckout = () => {
    let subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.qty,
      0,
    );
    let shipping = 30.0;
    let totalItems = cartItems.reduce((total, item) => total + item.qty, 0);

    return (
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                    Products ({totalItems})
                    <span>Rs: {Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Shipping <span>Rs: {shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                    <strong>Total amount</strong>
                    <span>
                      <strong>Rs: {Math.round(subtotal + shipping)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h4 className="mb-0">Billing Address</h4>
              </div>
              <div className="card-body">
                {orderSuccess && (
                  <div className="alert alert-success text-center">
                    ✅ Order placed successfully! You will be contacted shortly.
                  </div>
                )}
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmitForm}
                >
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-sm-6">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="1234 Main St"
                        required
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-5">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select
                        className="form-select"
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="">Choose...</option>
                        <option>Pakistan</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <select
                        className="form-select"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                      >
                        <option value="">Choose...</option>
                        <option>Punjab</option>
                        <option>Sindh</option>
                        <option>Balochistan</option>
                        <option>KPK</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="zip" className="form-label">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        placeholder="12345"
                        required
                        value={formData.zip}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button className="w-100 btn btn-primary" type="submit">
                    Confirm Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {cartItems.length > 0 ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
