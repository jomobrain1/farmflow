import { Link } from "react-router-dom";
import "../assets/styles/Dashboard.css";

const fieldCards = [
  {
    id: 1,
    name: "North Field",
    cropType: "Maize",
    stage: "Vegetative",
    plantingDate: "2026-03-12",
    assignedAgent: "Mercy",
    health: "Stable",
  },
  {
    id: 2,
    name: "River Plot",
    cropType: "Tomatoes",
    stage: "Flowering",
    plantingDate: "2026-03-28",
    assignedAgent: "David",
    health: "Needs review",
  },
  {
    id: 3,
    name: "East Block",
    cropType: "Beans",
    stage: "Planted",
    plantingDate: "2026-04-08",
    assignedAgent: "Janet",
    health: "Good",
  },
];

function Dashboard() {
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
          <strong className="dashboard-stat__value">{fieldCards.length}</strong>
        </article>
        <article className="dashboard-stat">
          <span className="dashboard-stat__label">Active stages</span>
          <strong className="dashboard-stat__value">3</strong>
        </article>
        <article className="dashboard-stat">
          <span className="dashboard-stat__label">Need review</span>
          <strong className="dashboard-stat__value">1</strong>
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
          {fieldCards.map((field) => (
            <article key={field.id} className="field-card">
              <div className="field-card__top">
                <div>
                  <h3 className="field-card__title">{field.name}</h3>
                  <p className="field-card__subtitle">{field.cropType}</p>
                </div>
                <span className="field-card__badge">{field.health}</span>
              </div>

              <dl className="field-card__details">
                <div className="field-card__row">
                  <dt>Stage</dt>
                  <dd>{field.stage}</dd>
                </div>
                <div className="field-card__row">
                  <dt>Planting date</dt>
                  <dd>{field.plantingDate}</dd>
                </div>
                <div className="field-card__row">
                  <dt>Assigned agent</dt>
                  <dd>{field.assignedAgent}</dd>
                </div>
              </dl>

              <div className="field-card__actions">
                <Link to={`/fields/edit/${field.id}`} className="field-card__button">
                  Edit
                </Link>
                <button type="button" className="field-card__button field-card__button--ghost">
                  View details
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
