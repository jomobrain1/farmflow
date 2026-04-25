import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FieldContext } from "../context/FieldContext.jsx";
import "../assets/styles/FieldForm.css";
import LoggedInGreeting from "./LoggedInGreeting.jsx";

function EditField() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fields, agents, loadingAgents, loadingFields, updateField } =
    useContext(FieldContext);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    crop_type: "",
    planting_date: "",
    current_stage: "Planted",
    assigned_agent_id: "",
    notes: "",
  });

  useEffect(() => {
    const existingField = fields.find((field) => String(field.id) === String(id));

    if (!existingField) {
      return;
    }

    setFormData({
      name: existingField.name || "",
      crop_type: existingField.crop_type || "",
      planting_date: existingField.planting_date?.slice(0, 10) || "",
      current_stage: existingField.current_stage || "Planted",
      assigned_agent_id: existingField.assigned_agent_id
        ? String(existingField.assigned_agent_id)
        : "",
      notes: "",
    });
  }, [fields, id]);

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

    const result = await updateField(id, {
      ...formData,
      assigned_agent_id: formData.assigned_agent_id || null,
    });

    setSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  };

  if (loadingFields) {
    return <main className="field-form-page">Loading field...</main>;
  }

  const selectedField = fields.find((field) => String(field.id) === String(id));

  if (!selectedField) {
    return <main className="field-form-page">Field not found.</main>;
  }

  return (
    <main className="field-form-page">
      <LoggedInGreeting />
      <section className="field-form-card">
        <p className="field-form-card__eyebrow">Fields</p>
        <h1 className="field-form-card__title">Edit field</h1>

        {error && <div className="field-form__error">{error}</div>}

        <form className="field-form" onSubmit={handleSubmit}>
          <label className="field-form__group" htmlFor="name">
            <span className="field-form__label">Field name</span>
            <input
              id="name"
              name="name"
              type="text"
              className="field-form__input"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="field-form__group" htmlFor="crop_type">
            <span className="field-form__label">Crop type</span>
            <input
              id="crop_type"
              name="crop_type"
              type="text"
              className="field-form__input"
              value={formData.crop_type}
              onChange={handleChange}
            />
          </label>

          <label className="field-form__group" htmlFor="planting_date">
            <span className="field-form__label">Planting date</span>
            <input
              id="planting_date"
              name="planting_date"
              type="date"
              className="field-form__input"
              value={formData.planting_date}
              onChange={handleChange}
            />
          </label>

          <label className="field-form__group" htmlFor="current_stage">
            <span className="field-form__label">Current stage</span>
            <select
              id="current_stage"
              name="current_stage"
              className="field-form__input"
              value={formData.current_stage}
              onChange={handleChange}
            >
              <option value="Planted">Planted</option>
              <option value="Vegetative">Vegetative</option>
              <option value="Flowering">Flowering</option>
              <option value="Harvest">Harvest</option>
            </select>
          </label>

          <label className="field-form__group" htmlFor="assigned_agent_id">
            <span className="field-form__label">Assigned agent</span>
            <select
              id="assigned_agent_id"
              name="assigned_agent_id"
              className="field-form__input"
              value={formData.assigned_agent_id}
              onChange={handleChange}
            >
              <option value="">
                {loadingAgents ? "Loading agents..." : "Select an agent"}
              </option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} ({agent.email})
                </option>
              ))}
            </select>
          </label>

          <label className="field-form__group" htmlFor="notes">
            <span className="field-form__label">Notes</span>
            <textarea
              id="notes"
              name="notes"
              className="field-form__input field-form__textarea"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add notes or observations"
              rows="4"
            />
          </label>

          <button
            type="submit"
            className="field-form__submit"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save changes"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default EditField;
