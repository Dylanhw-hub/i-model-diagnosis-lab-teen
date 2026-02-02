import React, { useState } from "react";
import "./OpeningDoors.css";

interface OpeningDoorsProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const OpeningDoors: React.FC<OpeningDoorsProps> = ({
  children,
  title = "I-Model Diagnosis Lab",
  subtitle = "Enter the I-Model",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyClosed, setIsFullyClosed] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsFullyClosed(true);
    }, 1500);
  };

  return (
    <div className="opening-doors-wrapper">
      {/* Main Content (Behind the doors) */}
      <div
        className={`opening-doors-content-area ${
          isOpen ? "visible" : "hidden"
        }`}
      >
        {children}
      </div>

      {/* The Doors Overlay */}
      {!isFullyClosed && (
        <div className="opening-doors-overlay">
          {/* Left Door */}
          <div
            className={`opening-doors-door opening-doors-door-left ${
              isOpen ? "open" : ""
            }`}
          >
            <div className="opening-doors-door-gradient" />
          </div>

          {/* Right Door */}
          <div
            className={`opening-doors-door opening-doors-door-right ${
              isOpen ? "open" : ""
            }`}
          >
            <div className="opening-doors-door-gradient" />
          </div>

          {/* Center Click Trigger */}
          <div
            className={`opening-doors-button-container ${
              isOpen ? "opening" : ""
            }`}
            onClick={handleOpen}
          >
            <div className="opening-doors-text-area">
              <h1 className="opening-doors-title">{title}</h1>
              <p className="opening-doors-subtitle">{subtitle}</p>
            </div>

            {/* Glowing Orb/Button */}
            <div className="opening-doors-orb-wrapper">
              <div className="opening-doors-orb-glow" />
              <div className="opening-doors-orb-outer">
                <div className="opening-doors-orb-inner">
                  <span className="opening-doors-orb-text">OPEN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpeningDoors;
