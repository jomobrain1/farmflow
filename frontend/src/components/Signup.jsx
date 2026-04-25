import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/AuthForm.css";
import axios from "axios";
import { apiUrl } from "../utils/api";

function Signup() {
  const [error, setError] = useState();
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Signup form submitted:", formData);
    try {
      await axios.post(apiUrl("/api/v1/auth/register"), formData, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Registration error");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-card__eyebrow">Create account</p>
        <h1 className="auth-card__title">Sign up</h1>
        <p className="auth-card__text">Create your FarmFlow account.</p>
        {error && <div className="auth-form__error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-form__group" htmlFor="name">
            <span className="auth-form__label">Name</span>
            <input
              id="name"
              name="name"
              type="text"
              className="auth-form__input"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="auth-form__group" htmlFor="email">
            <span className="auth-form__label">Email</span>
            <input
              id="email"
              name="email"
              type="email"
              className="auth-form__input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="auth-form__group" htmlFor="password">
            <span className="auth-form__label">Password</span>
            <input
              id="password"
              name="password"
              type="password"
              className="auth-form__input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="auth-form__submit">
            Create account
          </button>
        </form>

        <p className="auth-card__switch">
          Already registered?{" "}
          <Link to="/login" className="auth-card__link">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;
