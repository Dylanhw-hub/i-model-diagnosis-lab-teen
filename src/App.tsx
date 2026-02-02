import React, { useState } from "react";
import OpeningDoors from "./components/OpeningDoors";
import DiagnosisGame, { ScenarioResult } from "./components/DiagnosisGame";
import CompletionScreen from "./components/CompletionScreen";
import "./App.css";

type GamePhase = "playing" | "complete";

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("playing");
  const [results, setResults] = useState<ScenarioResult[]>([]);

  const handleGameComplete = (finalResults: ScenarioResult[]) => {
    setResults(finalResults);
    setGamePhase("complete");
  };

  const handleReset = () => {
    setGamePhase("playing");
    setResults([]);
  };

  const content =
    gamePhase === "playing" ? (
      <DiagnosisGame onComplete={handleGameComplete} />
    ) : (
      <CompletionScreen results={results} onReset={handleReset} />
    );

  return (
    <div className="app">
      <OpeningDoors
        title="I-Model Diagnosis Lab"
        subtitle="Enter the I-Model"
      >
        {content}
      </OpeningDoors>
    </div>
  );
}

export default App;
