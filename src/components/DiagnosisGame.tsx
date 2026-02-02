import React, { useState } from "react";
import { scenarios } from "../data/scenarios";
import ScenarioCard from "./ScenarioCard";
import IModeWeb from "./IModeWeb";
import FeedbackPanel from "./FeedbackPanel";
import "./DiagnosisGame.css";

interface DiagnosisGameProps {
  onComplete: (results: ScenarioResult[]) => void;
}

export interface ScenarioResult {
  scenarioId: string;
  selectedModes: string[];
  correctModes: string[];
  isCorrect: boolean;
  isPartiallyCorrect: boolean;
}

const DiagnosisGame: React.FC<DiagnosisGameProps> = ({ onComplete }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [results, setResults] = useState<ScenarioResult[]>([]);

  const currentScenario = scenarios[currentScenarioIndex];
  const correctModes = currentScenario.missingModes;
  const isCorrect =
    selectedModes.length === correctModes.length &&
    correctModes.every((mode) => selectedModes.includes(mode));
  const isPartiallyCorrect =
    !isCorrect && selectedModes.some((mode) => correctModes.includes(mode));

  const handleModesChange = (modes: string[]) => {
    setSelectedModes(modes);
  };

  const handleCheckAnswer = () => {
    const result: ScenarioResult = {
      scenarioId: currentScenario.id,
      selectedModes,
      correctModes,
      isCorrect,
      isPartiallyCorrect,
    };

    setResults([...results, result]);
    setHasChecked(true);
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedModes([]);
      setHasChecked(false);
    } else {
      onComplete([...results]);
    }
  };

  return (
    <div className="diagnosis-game">
      <div className="game-header">
        <div className="progress-container">
          <span className="progress-text">
            Scenario {currentScenarioIndex + 1} of {scenarios.length}
          </span>
          <div className="progress-dots">
            {scenarios.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${
                  index === currentScenarioIndex ? "active" : ""
                } ${index < currentScenarioIndex ? "completed" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="game-main-content">
        <div className="game-left">
          <ScenarioCard
            scenario={currentScenario}
            scenarioNumber={currentScenarioIndex + 1}
            totalScenarios={scenarios.length}
          />

          <FeedbackPanel
            isVisible={hasChecked}
            isCorrect={isCorrect}
            isPartiallyCorrect={isPartiallyCorrect}
            selectedModes={selectedModes}
            correctModes={correctModes}
            explanation={currentScenario.explanation}
          />
        </div>

        <div className="game-center">
          <h3 className="game-web-title">Drag modes to the center to lock them</h3>
          <IModeWeb
            selectedModes={selectedModes}
            onModesChange={handleModesChange}
            onLockStateChange={() => {}} // Lock state feedback not currently used
          />
        </div>
      </div>

      <div className="game-footer">
        {!hasChecked ? (
          <button
            className="check-button"
            onClick={handleCheckAnswer}
            disabled={selectedModes.length === 0}
          >
            Check Answer
          </button>
        ) : (
          <button className="next-button" onClick={handleNextScenario}>
            {currentScenarioIndex < scenarios.length - 1
              ? "Next Scenario"
              : "View Results"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DiagnosisGame;
