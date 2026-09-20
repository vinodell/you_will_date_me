import type { City } from "../types";
import { buttonLabels } from "../../../consts";

interface CityStepProps {
  readonly cities: readonly City[];
  readonly selectedCity: City;
  readonly onSelect: (city: City) => void;
  readonly onBack: () => void;
  readonly onContinue: () => void;
}

export function CityStep({ cities, selectedCity, onSelect, onBack, onContinue }: CityStepProps) {
  return (
    <section className="screen city-screen">
      <button className="back-button" type="button" onClick={onBack}>
        ← {buttonLabels.back}
      </button>
      <p className="eyebrow">Step three</p>
      <h1>Где погуляем?</h1>
      <div className="city-grid">
        {cities.map((city) => (
          <label className={`city-card ${city.id === selectedCity.id ? "selected" : ""}`} key={city.id}>
            <input
              type="radio"
              name="city"
              checked={city.id === selectedCity.id}
              onChange={() => onSelect(city)}
            />
            <img src={city.image} alt={city.title} />
            <span className="city-copy">
              <strong>{city.title}</strong>
              {city.detail && <small>{city.detail}</small>}
            </span>
            <span className="city-checkbox" aria-hidden="true">✓</span>
          </label>
        ))}
      </div>
      <button className="button button-primary continue-button" type="button" onClick={onContinue}>
        Перейдем к дате <span>→</span>
      </button>
    </section>
  );
}