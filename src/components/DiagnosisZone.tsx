import React from "react";
import "./DiagnosisZone.css";

const I_MODE_COLORS: Record<string, string> = {
  Intentionality: "#06b6d4",
  Integrity: "#10b981",
  Inquiry: "#f59e0b",
  Intuition: "#f43f5e",
};

interface DiagnosisZoneProps {
  selectedModes: string[];
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  isDraggingOver: boolean;
}

const DiagnosisZone: React.FC<DiagnosisZoneProps> = ({
  selectedModes,
  onDragOver,
  onDragLeave,
  onDrop,
  isDraggingOver,
}) => {
  return (
    <div
      className={`diagnosis-zone ${isDraggingOver ? "dragging-over" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="diagnosis-zone-label">
        <span className="label-text">What's Missing?</span>
      </div>

      <div className="diagnosis-zone-content">
        {selectedModes.length === 0 ? (
          <p className="empty-state">Drag I-Modes here to diagnose</p>
        ) : (
          <div className="selected-modes">
            {selectedModes.map((mode) => (
              <div
                key={mode}
                className="selected-mode-circle"
                style={{
                  backgroundColor: I_MODE_COLORS[mode],
                  boxShadow: `0 0 20px ${I_MODE_COLORS[mode]}40`,
                }}
              >
                <span className="mode-label">{mode}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisZone;
