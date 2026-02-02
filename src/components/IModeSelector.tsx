import React from "react";
import "./IModeSelector.css";

const I_MODES = ["Intentionality", "Integrity", "Inquiry", "Intuition"];
const I_MODE_COLORS: Record<string, string> = {
  Intentionality: "#06b6d4",
  Integrity: "#10b981",
  Inquiry: "#f59e0b",
  Intuition: "#f43f5e",
};

interface IModeSelectorProps {
  selectedModes: string[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, mode: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

const IModeSelector: React.FC<IModeSelectorProps> = ({
  selectedModes,
  onDragStart,
  onDragEnd,
}) => {
  return (
    <div className="imode-selector">
      <div className="modes-grid">
        {I_MODES.map((mode) => {
          const isSelected = selectedModes.includes(mode);
          return (
            <div
              key={mode}
              className={`imode-circle ${isSelected ? "selected" : ""}`}
              draggable
              onDragStart={(e) => onDragStart(e, mode)}
              onDragEnd={onDragEnd}
              style={{
                backgroundColor: I_MODE_COLORS[mode],
              }}
            >
              <span className="imode-name">{mode}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IModeSelector;
