import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoggedInGreeting from "./LoggedInGreeting.jsx";
import "../assets/styles/FieldForm.css";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "agent",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/agents/${id}`,
          { withCredentials: true },
        );

        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          role: response.data.role || "agent",
        });
      } catch (fetchError) {
        console.log(fetchError);
        setError(fetchError.response?.data?.message || "Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/agents/${id}`,
        formData,
        { withCredentials: true },
      );

      toast.success(response.data?.message || "User updated successfully");
      navigate("/");
    } catch (submitError) {
      console.log(submitError);
      setError(submitError.response?.data?.message || "Error updating user");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <main className="field-form-page">Loading user...</main>;
  }

  return (
    <main className="field-form-page">
      <LoggedInGreeting />
      <section className="field-form-card">
        <p className="field-form-card__eyebrow">Users</p>
        <h1 className="field-form-card__title">Edit user</h1>

        {error && <div className="field-form__error">{error}</div>}

        <form className="field-form" onSubmit={handleSubmit}>
          <label className="field-form__group" htmlFor="name">
            <span className="field-form__label">Name</span>
            <input
              id="name"
              name="name"
              type="text"
              className="field-form__input"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="field-form__group" htmlFor="email">
            <span className="field-form__label">Email</span>
            <input
              id="email"
              name="email"
              type="email"
              className="field-form__input"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="field-form__group" htmlFor="role">
            <span className="field-form__label">Role</span>
            <select
              id="role"
              name="role"
              className="field-form__input"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button
            type="submit"
            className="field-form__submit"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save user"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default EditUser;
