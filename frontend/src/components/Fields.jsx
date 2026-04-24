import { useContext } from "react";
import { Link } from "react-router-dom";
import { FieldContext } from "../context/FieldContext.jsx";
import "../assets/styles/Dashboard.css";

function Fields() {
  const { fields, loadingFields } = useContext(FieldContext);

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <h1 className="dashboard-hero__title">Fields</h1>
        <Link to="/fields/create" className="dashboard-hero__action">
          Add field
        </Link>
      </section>

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
                <dd>{field.assigned_agent_id ?? "Unassigned"}</dd>
              </div>
              <div className="field-card__row">
                <dt>Created by</dt>
                <dd>{field.created_by}</dd>
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
    </main>
  );
}

export default Fields;
