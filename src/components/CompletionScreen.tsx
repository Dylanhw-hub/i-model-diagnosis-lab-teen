import React, { useMemo } from "react";
import { ScenarioResult } from "./DiagnosisGame";
import "./CompletionScreen.css";

interface CompletionScreenProps {
  results: ScenarioResult[];
  onReset: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({
  results,
  onReset,
}) => {
  const stats = useMemo(() => {
    const correctCount = results.filter((r) => r.isCorrect).length;
    const modeFrequency: Record<string, number> = {};
    const modeMissed: Record<string, number> = {};

    results.forEach((result) => {
      result.correctModes.forEach((mode) => {
        modeFrequency[mode] = (modeFrequency[mode] || 0) + 1;

        const wasSelected = result.selectedModes.includes(mode);
        if (!wasSelected) {
          modeMissed[mode] = (modeMissed[mode] || 0) + 1;
        }
      });
    });

    const mostMissedMode = Object.entries(modeMissed).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      correctCount,
      modeFrequency,
      mostMissedMode: mostMissedMode
        ? {
            name: mostMissedMode[0],
            count: mostMissedMode[1],
          }
        : null,
    };
  }, [results]);

  const sortedModes = Object.entries(stats.modeFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="completion-screen">
      <div className="completion-content">
        <h1 className="completion-title">Practice Complete</h1>

        <div className="score-display">
          <div className="score-number">{stats.correctCount}</div>
          <div className="score-label">
            of {results.length} scenarios correct
          </div>
        </div>

        <div className="statistics">
          <div className="stat-card">
            <h3 className="stat-title">Most Frequently Missing</h3>
            <div className="stat-modes">
              {sortedModes.map(([mode, count]) => (
                <div key={mode} className="stat-mode">
                  <span className="mode-name">{mode}</span>
                  <span className="mode-count">
                    appeared in {count} scenario{count > 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {stats.mostMissedMode && (
            <div className="stat-card">
              <h3 className="stat-title">Your Biggest Challenge</h3>
              <div className="challenge-mode">
                <p className="challenge-text">
                  You struggled most with recognizing{" "}
                  <strong>{stats.mostMissedMode.name}</strong> (missed in{" "}
                  {stats.mostMissedMode.count} scenario
                  {stats.mostMissedMode.count > 1 ? "s" : ""})
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="reflection-section">
          <h2 className="reflection-title">Reflection</h2>
          <p className="reflection-text">
            As you return to your own work with AI, remember: the I-Model isn't
            a checklist to complete—it's a set of questions to keep asking.
            Which I-Mode do you think you'll need to pay most attention to?
          </p>
        </div>

        <button className="return-button" onClick={onReset}>
          Return to Course
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;
