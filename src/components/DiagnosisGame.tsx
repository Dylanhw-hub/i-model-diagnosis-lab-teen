import React, { useState } from "react";
import { Scenario, scenarios } from "../data/scenarios";
import ScenarioCard from "./ScenarioCard";
import DiagnosisZone from "./DiagnosisZone";
import IModeSelector from "./IModeSelector";
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
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [results, setResults] = useState<ScenarioResult[]>([]);
  const [draggedMode, setDraggedMode] = useState<string | null>(null);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, mode: string) => {
    setDraggedMode(mode);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedMode(null);
    setIsDraggingOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setIsDraggingOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (draggedMode) {
      if (selectedModes.includes(draggedMode)) {
        // Remove if already selected
        setSelectedModes(selectedModes.filter((m) => m !== draggedMode));
      } else {
        // Add if not selected
        setSelectedModes([...selectedModes, draggedMode]);
      }
    }
  };

  const handleCheckAnswer = () => {
    const correctModes = currentScenario.missingModes;
    const isCorrect =
      selectedModes.length === correctModes.length &&
      correctModes.every((mode) => selectedModes.includes(mode));
    const isPartiallyCorrect =
      !isCorrect &&
      selectedModes.some((mode) => correctModes.includes(mode));

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

  const correctModes = currentScenario.missingModes;
  const isCorrect =
    selectedModes.length === correctModes.length &&
    correctModes.every((mode) => selectedModes.includes(mode));
  const isPartiallyCorrect =
    !isCorrect && selectedModes.some((mode) => correctModes.includes(mode));

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

      <div className="game-container">
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
          <DiagnosisZone
            selectedModes={selectedModes}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            isDraggingOver={isDraggingOver}
          />

          {selectedModes.length > 0 && (
            <div className="remove-hint">
              Drag out to remove
            </div>
          )}
        </div>

        <div className="game-right">
          <IModeSelector
            selectedModes={selectedModes}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
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
