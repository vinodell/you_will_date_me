import type { Activity } from "../types";
import { buttonLabels } from "../../../consts";

interface ActivityStepProps {
  readonly activities: readonly Activity[];
  readonly selectedActivity: Activity;
  readonly onSelect: (activity: Activity) => void;
  readonly onBack: () => void;
  readonly onContinue: () => void;
}

export function ActivityStep({
  activities,
  selectedActivity,
  onSelect,
  onBack,
  onContinue,
}: ActivityStepProps) {
  return (
    <section className="screen activity-screen">
      <button className="back-button" type="button" onClick={onBack}>
        ← {buttonLabels.back}
      </button>
      <p className="eyebrow">Step two</p>
      <h1>Чего бы ты хотела?</h1>
      <div className="activity-grid">
        {activities.map((activity) => (
          <button
            className={`activity-card ${activity.id === selectedActivity.id ? "selected" : ""}`}
            type="button"
            key={activity.id}
            onClick={() => onSelect(activity)}
          >
            <span className={`activity-art ${activity.color}`}>
              <img src={activity.icon} alt={activity.title} />
            </span>
            <span className="activity-copy">
              <strong>{activity.title}</strong>
              <small>{activity.detail}</small>
            </span>
            <span className="radio-dot" aria-hidden="true" />
          </button>
        ))}
      </div>
      <button
        className="button button-primary continue-button"
        type="button"
        onClick={onContinue}
      >
        {buttonLabels.chooseLocation} <span>→</span>
      </button>
    </section>
  );
}
