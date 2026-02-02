import React from "react";
import { Scenario } from "../data/scenarios";
import "./ScenarioCard.css";

interface ScenarioCardProps {
  scenario: Scenario;
  scenarioNumber: number;
  totalScenarios: number;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  scenarioNumber,
  totalScenarios,
}) => {
  return (
    <div className="scenario-card">
      <div className="scenario-header">
        <h2 className="scenario-title">{scenario.title}</h2>
        <span className="scenario-counter">
          {scenarioNumber} of {totalScenarios}
        </span>
      </div>

      <div className="scenario-vignette">
        <p>{scenario.vignette}</p>
      </div>
    </div>
  );
};

export default ScenarioCard;
