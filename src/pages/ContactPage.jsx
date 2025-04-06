import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_38dtz0m",
        "template_feita1q",
        formData,
        "hAYL-Z6xdXVk-fpPS",
      )
      .then(
        () => {
          toast.success("Email sent successfully! We will contact you ASAP");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          toast.error("Failed to send email.");
        },
      );
  };

  const sendWhatsApp = () => {
    const phoneNumber = "923004844897";
    const whatsappMessage = `Hello, my name is ${formData.name}. My email is ${formData.email}. My message is ${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={sendEmail}>
              <div className="my-3">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="Message">Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="Message"
                  name="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button className="my-2 px-4 btn btn-dark" type="submit">
                  Send Email
                </button>
                <button
                  type="button"
                  className="my-2 mx-2 px-4 btn btn-success"
                  onClick={sendWhatsApp}
                >
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
