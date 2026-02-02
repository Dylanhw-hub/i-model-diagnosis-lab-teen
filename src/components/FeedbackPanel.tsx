import React, { useEffect, useState } from "react";
import "./FeedbackPanel.css";

interface FeedbackPanelProps {
  isVisible: boolean;
  isCorrect: boolean;
  isPartiallyCorrect: boolean;
  selectedModes: string[];
  correctModes: string[];
  explanation: string;
}

const I_MODE_COLORS: Record<string, string> = {
  Intentionality: "#06b6d4",
  Integrity: "#10b981",
  Inquiry: "#f59e0b",
  Intuition: "#f43f5e",
};

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  isVisible,
  isCorrect,
  isPartiallyCorrect,
  selectedModes,
  correctModes,
  explanation,
}) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const getResultClass = () => {
    if (isCorrect) return "correct";
    if (isPartiallyCorrect) return "partial";
    return "incorrect";
  };

  const getResultMessage = () => {
    if (correctModes.length === 0) {
      return "Perfect! All I-Modes were present.";
    }
    if (isCorrect) {
      return `Correct! ${correctModes.length} missing I-Mode${correctModes.length > 1 ? "s" : ""} identified.`;
    }
    if (isPartiallyCorrect) {
      const correct = selectedModes.filter((m) => correctModes.includes(m))
        .length;
      return `Partially correct. You found ${correct} of ${correctModes.length} missing I-Modes.`;
    }
    return "Not quite. Let's look at what was missing.";
  };

  return (
    <div className={`feedback-panel ${getResultClass()} ${pulse ? "pulse" : ""}`}>
      <div className="feedback-header">
        <h3 className="feedback-title">{getResultMessage()}</h3>
      </div>

      {correctModes.length > 0 && (
        <div className="correct-modes">
          <p className="section-label">Missing I-Modes:</p>
          <div className="modes-display">
            {correctModes.map((mode) => (
              <div
                key={mode}
                className="mode-badge"
                style={{ backgroundColor: I_MODE_COLORS[mode] }}
              >
                {mode}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="explanation">
        <p className="section-label">Why:</p>
        <p className="explanation-text">{explanation}</p>
      </div>
    </div>
  );
};

export default FeedbackPanel;
