import { useState } from "react";
import catGif from "./assets/cat.gif";
import noGif from "./assets/noBtn.png";
import dateMeImg from "./assets/date_me.jpg";

import { activities, buttonLabels, cities, telegramApi } from "./const";
import "./App.css";

function App() {
  const [activity, setActivity] = useState(activities[1]);
  const [city, setCity] = useState(cities[0]);
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
          city: city.title,
          date,
          time,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Telegram send failed");
      }
      setStep(5);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setIsSending(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <span className="step-count">0{Math.min(step, 5)} / 05</span>
      </header>

      <div className="progress">
        <span style={{ width: `${(Math.min(step, 5) / 5) * 100}%` }} />
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
                  <img src={item.icon} alt={item.title} />
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
            {buttonLabels.chooseLocation} <span>→</span>
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="screen city-screen">
          <button
            className="back-button"
            type="button"
            onClick={() => setStep(2)}
          >
            ← {buttonLabels.back}
          </button>
          <p className="eyebrow">Step three</p>
          <h1>Где погуляем?</h1>
          <div className="city-grid">
            {cities.map((item) => (
              <label
                className={`city-card ${item.id === city.id ? "selected" : ""}`}
                key={item.id}
              >
                <input
                  type="checkbox"
                  checked={item.id === city.id}
                  onChange={() => setCity(item)}
                />
                <img src={item.image} alt={item.title} />
                <span className="city-copy">
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </span>
                <span className="city-checkbox" aria-hidden="true">
                  ✓
                </span>
              </label>
            ))}
          </div>
          <button
            className="button button-primary continue-button"
            type="button"
            onClick={() => setStep(4)}
          >
            Перейдем к дате <span>→</span>
          </button>
        </section>
      )}

      {step === 4 && (
        <section className="screen date-screen">
          <button
            className="back-button"
            type="button"
            onClick={() => setStep(3)}
          >
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
            <img className="summary-image" src={activity.icon} alt="" />
            <div>
              <small>Наш план</small>
              <strong>
                {activity.title} · {city.title}
              </strong>
            </div>
            <button type="button" onClick={() => setStep(3)}>
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

      {step === 5 && (
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
