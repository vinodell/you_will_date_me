import type { Activity, City } from "../types";
import { buttonLabels } from "../../../consts";

interface SuccessStepProps {
  readonly activity: Activity;
  readonly city: City;
  readonly date: string;
  readonly time: string;
  readonly onStartOver: () => void;
}

export function SuccessStep({
  activity,
  city,
  date,
  time,
  onStartOver,
}: SuccessStepProps) {
  return (
    <section className="screen success-screen">
      <div className="success-icon">♥</div>
      <h1>Класс. Теперь у нас есть план!</h1>
      <p className="subtitle">
        С меня хорошая компания, с тебя — улыбка и хорошее настроение
      </p>
      <div className="last-summary">
        <div className="final-note">
          <strong>
            {activity.title} · {city.title}
          </strong>
          <span>
            {date} at {time}
          </span>
        </div>
        <button
          className="button button-ghost"
          type="button"
          onClick={onStartOver}
        >
          {buttonLabels.startOver}
        </button>
      </div>
    </section>
  );
}
