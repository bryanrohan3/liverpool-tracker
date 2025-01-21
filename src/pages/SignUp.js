import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../helper/axiosHelper"; // Import signup endpoint
import "../utils/buttons.scss";
import "../utils/fonts.scss";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);

  useEffect(() => {
    const { firstName, lastName, username, email, password, confirmPassword } =
      formData;
    const allFieldsFilled =
      firstName && lastName && username && email && password && confirmPassword;
    const passwordsMatch = password === confirmPassword;
    setIsFormValid(allFieldsFilled && passwordsMatch);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    if (!isFormValid) {
      setError("Please fill in all fields correctly.");
      return;
    }
    try {
      const { firstName, lastName, username, email, password } = formData;
      // Make sure the keys match the backend field names
      await endpoints.signup({
        first_name: firstName, // Change to 'first_name'
        last_name: lastName, // Change to 'last_name'
        username,
        email,
        password,
      });
      setError(null);
      navigate("/");
    } catch (err) {
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div className="centre-screen">
      <p className="mb-30 bold fs-22">
        <span className="red">Red</span>
        <span className="route">Route</span>
        <span className="full-stop">.</span>
      </p>
      <input
        className="fs-14 login-input"
        type="text"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <input
        className="fs-14 mt-10 login-input"
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
      />
      <input
        className="fs-14 mt-10 login-input"
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        className="fs-14 mt-10 login-input"
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        className="fs-14 mt-10 login-input"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <input
        className="fs-14 mt-10 login-input"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      <div className="mt-10">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <label htmlFor="showPassword" className="fs-14">
          Show Password
        </label>
      </div>
      {error && <p className="error-message fs-12">{error}</p>}
      <button
        className="mt-30 button button--primary fw-400"
        onClick={handleSignup}
        disabled={!isFormValid}
      >
        Sign Up
      </button>
      <p className="mt-20 fs-14">
        Already have an account?{" "}
        <button className="button button--link" onClick={() => navigate("/")}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
