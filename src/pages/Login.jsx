import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { observer } from "mobx-react";
import Loginstore from "../mobx/loginstore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const adminLogin = (e) => {
    e.preventDefault();

    if (
      email === "muhammadabdullah@gmail.com" &&
      password === "Abdullah@1234"
    ) {
      Loginstore.setadmin(true);
      toast.success("Admin login successful!");
      navigate("/");
    } else {
      toast.error("Email and password not accepted");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={adminLogin}>
              <div className="my-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button className="my-2 btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
});

export default Login;
