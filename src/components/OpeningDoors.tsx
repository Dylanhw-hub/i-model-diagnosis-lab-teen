import React, { useState, useEffect } from "react";
import "./OpeningDoors.css";

interface OpeningDoorsProps {
  onOpen: () => void;
}

const OpeningDoors: React.FC<OpeningDoorsProps> = ({ onOpen }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="opening-doors-container">
      <div className={`door door-left ${isReady ? "ready" : ""}`}></div>
      <div className={`door door-right ${isReady ? "ready" : ""}`}></div>

      <div className="opening-doors-content">
        <h1 className="opening-doors-title">I-Model Diagnosis Lab</h1>
        <p className="opening-doors-subtitle">Practice Mode</p>
        <p className="opening-doors-description">
          Test your ability to recognize missing I-Modes in real scenarios
        </p>

        <button className="opening-doors-button" onClick={onOpen}>
          BEGIN
        </button>
      </div>
    </div>
  );
};

export default OpeningDoors;
