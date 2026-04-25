import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Dashboard.css";
import { FieldContext } from "../context/FieldContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import LoggedInGreeting from "./LoggedInGreeting.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../utils/api";

function Dashboard() {
  const navigate = useNavigate();
  const { fields, loadingFields, deleteField } = useContext(FieldContext);
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const isAdmin = user?.role === "admin";
  const visibleFields = isAdmin
    ? fields
    : fields.filter(
        (field) => Number(field.assigned_agent_id) === Number(user?.id),
      );
  const atRiskCount = visibleFields.filter(
    (field) => field.status === "At Risk",
  ).length;
  const activeCount = visibleFields.filter(
    (field) => field.status === "Active",
  ).length;

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    } else {
      setUsers([]);
      setLoadingUsers(false);
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(apiUrl("/api/v1/agents"), {
        withCredentials: true,
      });
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDelete = async (fieldId) => {
    const confirmed = window.confirm("Delete this field?");

    if (!confirmed) {
      return;
    }

    await deleteField(fieldId);
  };

  const handleDeleteUser = async (listedUser) => {
    const confirmed = window.confirm(`Delete ${listedUser.name}?`);
    if (!confirmed) return;

    try {
      const response = await axios.delete(apiUrl(`/api/v1/agents/${listedUser.id}`), {
        withCredentials: true,
      });
      toast.success(response.data?.message || "User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  return (
    <main className="dashboard-page">
      <LoggedInGreeting />
      <section className="dashboard-hero">
        <h1 className="dashboard-hero__title">Dashboard</h1>

        {isAdmin ? (
          <Link to="/fields/create" className="dashboard-hero__action">
            Add field
          </Link>
        ) : null}
      </section>

      <section className="dashboard-stats" aria-label="Field summary">
        <article className="dashboard-stat">
          <span className="dashboard-stat__label">Total fields</span>
          <strong className="dashboard-stat__value">{visibleFields.length}</strong>
        </article>
        <article className="dashboard-stat">
          <span className="dashboard-stat__label">Active</span>
          <strong className="dashboard-stat__value">{activeCount}</strong>
        </article>
        <article className="dashboard-stat">
          <span className="dashboard-stat__label">At risk</span>
          <strong className="dashboard-stat__value">{atRiskCount}</strong>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Fields</h2>
          <Link to="/fields" className="dashboard-section__link">
            View all
          </Link>
        </div>

        <div className="field-grid">
          {loadingFields ? <p>Loading fields...</p> : null}
          {!loadingFields && visibleFields.length === 0 ? (
            <p className="dashboard-empty">No fields yet.</p>
          ) : null}
          {visibleFields.map((field) => {
            const canEdit =
              isAdmin || Number(field.assigned_agent_id) === Number(user?.id);

            return (
              <article key={field.id} className="field-card">
                <div className="field-card__top">
                  <div>
                    <h3 className="field-card__title">{field.name}</h3>
                    <p className="field-card__subtitle">{field.crop_type}</p>
                  </div>
                  <span
                    className={`field-card__badge field-card__badge--${field.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {field.status}
                  </span>
                </div>

                <dl className="field-card__details">
                  <div className="field-card__row">
                    <dt>Status</dt>
                    <dd>{field.status}</dd>
                  </div>
                  <div className="field-card__row">
                    <dt>Stage</dt>
                    <dd>{field.current_stage}</dd>
                  </div>
                  <div className="field-card__row">
                    <dt>Planting date</dt>
                    <dd>{field.planting_date?.slice(0, 10)}</dd>
                  </div>
                  <div className="field-card__row">
                    <dt>Assigned agent</dt>
                    <dd>{field.assigned_agent_name ?? "Unassigned"}</dd>
                  </div>
                </dl>

                <div className="field-card__actions">
                  {canEdit && (
                    <Link
                      to={`/fields/edit/${field.id}`}
                      className="field-card__button"
                    >
                      Edit
                    </Link>
                  )}
                  {isAdmin && (
                    <button
                      type="button"
                      className="field-card__button field-card__button--ghost field-card__button--danger"
                      onClick={() => handleDelete(field.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {isAdmin ? (
        <section className="dashboard-section">
          <div className="dashboard-section__header">
            <h2 className="dashboard-section__title">Users</h2>
          </div>

          {loadingUsers ? <p>Loading users...</p> : null}
          {!loadingUsers && users.length === 0 ? (
            <p className="dashboard-empty">No users found.</p>
          ) : null}
          {!loadingUsers && users.length > 0 ? (
            <div className="users-table-wrap">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((listedUser) => (
                    <tr key={listedUser.id}>
                      <td>{listedUser.name}</td>
                      <td>{listedUser.email}</td>
                      <td className="users-table__role">{listedUser.role}</td>
                      <td>{listedUser.created_at?.slice(0, 10) ?? "-"}</td>
                      <td className="users-table__actions">
                        <button
                          type="button"
                          className="users-table__button"
                          onClick={() => navigate(`/users/edit/${listedUser.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="users-table__button users-table__button--danger"
                          onClick={() => handleDeleteUser(listedUser)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}

export default Dashboard;
