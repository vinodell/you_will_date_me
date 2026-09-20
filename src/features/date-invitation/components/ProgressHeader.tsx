import type { InvitationStep } from "../types";

interface ProgressHeaderProps {
  readonly step: InvitationStep;
}

export function ProgressHeader({ step }: ProgressHeaderProps) {
  const progress = (step / 5) * 100;

  return (
    <>
      <header className="topbar">
        <span className="step-count">0{step} / 05</span>
      </header>
      <div className="progress" aria-label={`Шаг ${step} из 5`}>
        <span style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}