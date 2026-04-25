import { useContext } from "react";
import { Link } from "react-router-dom";
import { FieldContext } from "../context/FieldContext.jsx";
import "../assets/styles/Dashboard.css";
import { AuthContext } from "../context/AuthContext.jsx";
import LoggedInGreeting from "./LoggedInGreeting.jsx";

function Fields() {
  const { fields, loadingFields, deleteField } = useContext(FieldContext);
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const visibleFields = isAdmin
    ? fields
    : fields.filter(
        (field) => Number(field.assigned_agent_id) === Number(user?.id),
      );

  const handleDelete = async (fieldId) => {
    const confirmed = window.confirm("Delete this field?");

    if (!confirmed) {
      return;
    }

    await deleteField(fieldId);
  };

  return (
    <main className="dashboard-page">
      <LoggedInGreeting />
      <section className="dashboard-hero">
        <h1 className="dashboard-hero__title">Fields</h1>
        {isAdmin ? (
          <Link to="/fields/create" className="dashboard-hero__action">
            Add field
          </Link>
        ) : null}
      </section>

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
                <div className="field-card__row">
                  <dt>Created by</dt>
                  <dd>{field.created_by}</dd>
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
    </main>
  );
}

export default Fields;
