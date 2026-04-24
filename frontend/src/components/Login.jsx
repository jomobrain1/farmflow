import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/AuthForm.css";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";
function Login() {
  const { loading, login } = useContext(AuthContext);
  const navigate = useNavigate("");

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
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
    setError("");

    try {
      const success = await login(formData);

      if (success) {
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Login error");
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-card__eyebrow">Welcome back</p>
        <h1 className="auth-card__title">Login</h1>
        <p className="auth-card__text">Sign in to your FarmFlow account.</p>
        {error && <div className="auth-form__error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="auth-form__submit">
            Login
          </button>
        </form>

        <p className="auth-card__switch">
          Not registered?{" "}
          <Link to="/signup" className="auth-card__link">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
