import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import "../assets/styles/LoggedInGreeting.css";

function LoggedInGreeting() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <section className="logged-in-greeting">
      <p className="logged-in-greeting__text">
        Welcome: <strong>{user.name}</strong>
      </p>
      <span className="logged-in-greeting__role">
        {user.role === "admin" ? "Admin" : "Agent"}
      </span>
    </section>
  );
}

export default LoggedInGreeting;
