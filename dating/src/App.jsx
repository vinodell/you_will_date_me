import { useState } from "react";
import catGif from "./assets/cat.gif";
import noGif from "./assets/noBtn.png";

import {
  activities,
  buttonLabels,
  telegramApi,
  WEB_ACCESS_KEY,
} from "./const";
import "./App.css";

function App() {
  const [activity, setActivity] = useState(activities[1]);
  const [date, setDate] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [noBtnHover, setNoBtnHover] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(1);
  const [time, setTime] = useState("");

  const moveNoButton = () => {
    setNoPosition({
      x: Math.round(Math.random() * 420 - 210),
      y: Math.round(Math.random() * 220 - 110),
    });
  };

  const goToStepOne = () => {
    setStep(1);
    setNoBtnHover(false);
    setNoPosition({ x: 0, y: 0 });
  };

  const dateReady = date && time;

  console.log("WEB_ACCESS_KEY", WEB_ACCESS_KEY);

  const sendTelegram = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      const response = await fetch(telegramApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity: activity.title,
          details: activity.detail,
          date,
          time,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Telegram send failed");
      }
      setStep(4);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setIsSending(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <span className="step-count">0{step} / 03</span>
      </header>

      <div className="progress">
        <span style={{ width: `${(step / 3) * 100}%` }} />
      </div>

      {step === 1 && (
        <section className="screen question-screen">
          <p className="eyebrow">очень важный вопрос</p>
          <h1>Идем на свидание?</h1>
          <p className="subtitle">
            Я обещаю хорошую беседу и еще вкусные закуски.
          </p>
          <div
            className="cat-wrap"
            aria-label="A cute cat waiting for your answer"
          >
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✧</span>
            {(!noBtnHover && <img className="cat" src={catGif}></img>) || (
              <img className="cat" src={noGif} />
            )}
            <span className="cat-heart">♥</span>
          </div>
          <div className="answer-zone">
            <button
              className="button button-primary"
              type="button"
              onClick={() => setStep(2)}
            >
              {buttonLabels.yes}
            </button>
            <button
              className="button button-ghost no-button"
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              }}
              type="button"
              onMouseEnter={(e) => {
                setNoBtnHover(true);
                moveNoButton(e);
              }}
              onFocus={moveNoButton}
              onClick={moveNoButton}
            >
              Неет
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="screen activity-screen">
          <button className="back-button" type="button" onClick={goToStepOne}>
            ← {buttonLabels.back}
          </button>
          <p className="eyebrow">Step two</p>
          <h1>Чего бы ты хотела?</h1>
          <div className="activity-grid">
            {activities.map((item) => (
              <button
                className={`activity-card ${item.id === activity.id ? "selected" : ""}`}
                type="button"
                key={item.id}
                onClick={() => setActivity(item)}
              >
                <span className={`activity-art ${item.color}`}>
                  {item.icon}
                </span>
                <span className="activity-copy">
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </span>
                <span className="radio-dot" aria-hidden="true" />
              </button>
            ))}
          </div>
          <button
            className="button button-primary continue-button"
            type="button"
            onClick={() => setStep(3)}
          >
            {buttonLabels.chooseDate} <span>→</span>
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="screen date-screen">
          <button
            className="back-button"
            type="button"
            onClick={() => setStep(2)}
          >
            ← {buttonLabels.back}
          </button>
          <p className="eyebrow">Step three</p>
          <h1>Когда мне тебя украсть?</h1>
          <p className="subtitle">
            Календарь полностью твой, просто выбери время Х
          </p>
          <div className="date-panel">
            <label>
              Выбери день
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
            <label>
              Выбери время
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </label>
          </div>
          <div className="summary">
            <span>{activity.icon}</span>
            <div>
              <small>Наш план</small>
              <strong>{activity.title}</strong>
            </div>
            <button type="button" onClick={() => setStep(2)}>
              {buttonLabels.edit}
            </button>
          </div>
          <button
            className="button button-primary continue-button"
            type="button"
            disabled={!dateReady || isSending}
            onClick={sendTelegram}
          >
            Make it official <span>♥</span>
          </button>
        </section>
      )}

      {step === 4 && (
        <section className="screen success-screen">
          <div className="success-icon">♥</div>
          <h1>Класс. Теперь у нас есть план!</h1>
          <p className="subtitle">
            С меня хорошая компания, с тебя — улыбка и хорошее настроение
          </p>
          <div className="last-summary">
            <div className="final-note">
              <strong>{activity.title}</strong>
              <span>
                {date} at {time}
              </span>
            </div>
            <button
              className="button button-ghost"
              type="button"
              onClick={() => setStep(1)}
            >
              {buttonLabels.startOver}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
