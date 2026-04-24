import { useContext } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Dashboard.css";
import { FieldContext } from "../context/FieldContext.jsx";

function Dashboard() {
  const { fields, loadingFields } = useContext(FieldContext);
  const needsReviewCount = fields.filter(
    (field) => field.current_stage === "Flowering",
  ).length;

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <h1 className="dashboard-hero__title">Dashboard</h1>

        <Link to="/fields/create" className="dashboard-hero__action">
          Add field
        </Link>
      </section>

      <section className="dashboard-stats" aria-label="Field summary">
        <article className="dashboard-stat">
          <span className="dashboard-stat__label">Total fields</span>
          <strong className="dashboard-stat__value">{fields.length}</strong>
        </article>
        <article className="dashboard-stat">
          <span className="dashboard-stat__label">Active stages</span>
          <strong className="dashboard-stat__value">
            {new Set(fields.map((field) => field.current_stage)).size}
          </strong>
        </article>
        <article className="dashboard-stat">
          <span className="dashboard-stat__label">Need review</span>
          <strong className="dashboard-stat__value">{needsReviewCount}</strong>
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
          {!loadingFields && fields.length === 0 ? (
            <p className="dashboard-empty">No fields yet.</p>
          ) : null}
          {fields.map((field) => (
            <article key={field.id} className="field-card">
              <div className="field-card__top">
                <div>
                  <h3 className="field-card__title">{field.name}</h3>
                  <p className="field-card__subtitle">{field.crop_type}</p>
                </div>
                <span className="field-card__badge">{field.current_stage}</span>
              </div>

              <dl className="field-card__details">
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
                  <dd>{field.assigned_agent_id ?? "Unassigned"}</dd>
                </div>
              </dl>

              <div className="field-card__actions">
                <Link to={`/fields/edit/${field.id}`} className="field-card__button">
                  Edit
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
