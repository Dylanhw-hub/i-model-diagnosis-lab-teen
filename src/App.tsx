import React, { useState } from "react";
import OpeningDoors from "./components/OpeningDoors";
import DiagnosisGame, { ScenarioResult } from "./components/DiagnosisGame";
import CompletionScreen from "./components/CompletionScreen";
import "./App.css";

type GamePhase = "intro" | "playing" | "complete";

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [results, setResults] = useState<ScenarioResult[]>([]);

  const handleStartGame = () => {
    setGamePhase("playing");
  };

  const handleGameComplete = (finalResults: ScenarioResult[]) => {
    setResults(finalResults);
    setGamePhase("complete");
  };

  const handleReset = () => {
    setGamePhase("intro");
    setResults([]);
  };

  return (
    <div className="app">
      {gamePhase === "intro" && <OpeningDoors onOpen={handleStartGame} />}
      {gamePhase === "playing" && <DiagnosisGame onComplete={handleGameComplete} />}
      {gamePhase === "complete" && (
        <CompletionScreen results={results} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
