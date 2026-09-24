import { useState } from "react";
import catGif from "../../../assets/cat.gif";
import noGif from "../../../assets/noBtn.png";
import { buttonLabels } from "../../../consts";

interface QuestionStepProps {
  readonly onAccept: () => void;
}

export function QuestionStep({ onAccept }: QuestionStepProps) {
  const [isNoButtonHovered, setIsNoButtonHovered] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    setNoPosition({
      x: Math.round(Math.random() * 420 - 210),
      y: Math.round(Math.random() * 220 - 110),
    });
  };

  return (
    <section className="screen question-screen">
      <p className="eyebrow">очень важный вопрос</p>
      <h1>Идем на свидание?</h1>
      <p className="subtitle">Я обещаю хорошую беседу и еще вкусные закуски.</p>
      <div className="cat-wrap" aria-label="A cute cat waiting for your answer">
        <span className="spark spark-one">✦</span>
        <span className="spark spark-two">✧</span>
        <img className="cat" src={isNoButtonHovered ? noGif : catGif} alt="" />
        <span className="cat-heart">♥</span>
      </div>
      <div className="answer-zone">
        <button
          className="button button-primary"
          type="button"
          onClick={onAccept}
        >
          {buttonLabels.yes}
        </button>
        <button
          className="button button-ghost no-button"
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
          }}
          type="button"
          onMouseEnter={() => {
            setIsNoButtonHovered(true);
            moveNoButton();
          }}
          onFocus={moveNoButton}
          onClick={moveNoButton}
        >
          Неет
        </button>
      </div>
    </section>
  );
}
