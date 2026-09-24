import dateMeImg from "../../../assets/date_me.jpg";
import type { Activity, City } from "../types";
import { buttonLabels } from "../../../consts";

interface DateStepProps {
  readonly activity: Activity;
  readonly city: City;
  readonly date: string;
  readonly time: string;
  readonly isSending: boolean;
  readonly errorMessage: string | null;
  readonly onDateChange: (date: string) => void;
  readonly onTimeChange: (time: string) => void;
  readonly onBack: () => void;
  readonly onEditCity: () => void;
  readonly onSubmit: () => void;
}

export function DateStep({
  activity,
  city,
  date,
  time,
  isSending,
  errorMessage,
  onDateChange,
  onTimeChange,
  onBack,
  onEditCity,
  onSubmit,
}: DateStepProps) {
  const minDate = new Date().toISOString().split("T")[0];
  const isReady = Boolean(date && time);

  return (
    <section className="screen date-screen">
      <button className="back-button" type="button" onClick={onBack}>
        ← {buttonLabels.back}
      </button>
      <p className="eyebrow">Step four</p>
      <div className="date-heading">
        <h1>Когда мне тебя украсть?</h1>
        <img
          className="date-me-image"
          src={dateMeImg}
          alt="Date illustration"
        />
      </div>
      <div className="date-panel">
        <label>
          Выбери день
          <input
            type="date"
            value={date}
            min={minDate}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </label>
        <label>
          Выбери время
          <input
            type="time"
            value={time}
            onChange={(event) => onTimeChange(event.target.value)}
          />
        </label>
      </div>
      <div className="summary">
        <img className="summary-image" src={activity.icon} alt="" />
        <div>
          <small>Наш план</small>
          <strong>
            {activity.title} · {city.title}
          </strong>
        </div>
        <button type="button" onClick={onEditCity}>
          {buttonLabels.edit}
        </button>
      </div>
      {errorMessage && (
        <p role="alert" className="form-error">
          {errorMessage}
        </p>
      )}
      <button
        className="button button-primary continue-button"
        type="button"
        disabled={!isReady || isSending}
        onClick={onSubmit}
      >
        {isSending ? "Отправляем..." : "Make it official"} <span>♥</span>
      </button>
    </section>
  );
}
