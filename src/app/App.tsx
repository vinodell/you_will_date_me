import { useState } from "react";
import { activities, cities } from "../consts";
import {
  ActivityStep,
  CityStep,
  DateStep,
  QuestionStep,
  SuccessStep,
  ProgressHeader,
  Activity,
  City,
  InvitationStep,
  sendDateInvitation,
} from "../features/date-invitation";

import "../App.css";

function App() {
  const [activity, setActivity] = useState<Activity>(activities[1]);
  const [city, setCity] = useState<City>(cities[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [step, setStep] = useState<InvitationStep>(1);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (isSending || !date || !time) return;

    setIsSending(true);
    setErrorMessage(null);

    try {
      await sendDateInvitation({
        activity: activity.title,
        details: activity.detail,
        city: city.title,
        date,
        time,
      });
      setStep(5);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setErrorMessage("Не удалось отправить приглашение. Попробуй еще раз.");
    } finally {
      setIsSending(false);
    }
  };

  const resetInvitation = () => {
    setStep(1);
    setErrorMessage(null);
  };

  return (
    <main className="app-shell">
      <ProgressHeader step={step} />
      {step === 1 && <QuestionStep onAccept={() => setStep(2)} />}
      {step === 2 && (
        <ActivityStep
          activities={activities}
          selectedActivity={activity}
          onSelect={setActivity}
          onBack={() => setStep(1)}
          onContinue={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <CityStep
          cities={cities}
          selectedCity={city}
          onSelect={setCity}
          onBack={() => setStep(2)}
          onContinue={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <DateStep
          activity={activity}
          city={city}
          date={date}
          time={time}
          isSending={isSending}
          errorMessage={errorMessage}
          onDateChange={setDate}
          onTimeChange={setTime}
          onBack={() => setStep(3)}
          onEditCity={() => setStep(3)}
          onSubmit={handleSubmit}
        />
      )}
      {step === 5 && (
        <SuccessStep
          activity={activity}
          city={city}
          date={date}
          time={time}
          onStartOver={resetInvitation}
        />
      )}
    </main>
  );
}

export default App;
