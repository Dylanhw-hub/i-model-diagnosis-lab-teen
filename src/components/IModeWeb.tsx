import React, { useState, useRef, useEffect, useMemo } from "react";
import "./IModeWeb.css";

interface Position {
  x: number;
  y: number;
}

interface IModeWebProps {
  selectedModes: string[];
  onModesChange: (modes: string[]) => void;
  onLockStateChange: (isLocked: boolean) => void;
}

const MODES = ["Intentionality", "Integrity", "Inquiry", "Intuition"];
const COLORS: Record<string, string> = {
  Intentionality: "#06b6d4",
  Integrity: "#10b981",
  Inquiry: "#f59e0b",
  Intuition: "#f43f5e",
};

const I_MODE_RADIUS = 50; // Radius of each mode circle
const WEB_RADIUS = 200; // Distance from center to rest positions
const LOCK_RADIUS = 100; // Radius where modes lock into center
const LOCK_CENTER = { x: 640, y: 350 }; // Center lock zone
const LOCK_SIZE = 120; // Size of lock zone circle

const IModeWeb: React.FC<IModeWebProps> = ({
  selectedModes,
  onModesChange,
  onLockStateChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState<Position>({ x: 0, y: 0 });
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const [locked, setLocked] = useState<Record<string, boolean>>({});
  const animationFrameRef = useRef<number>();

  // Calculate rest positions (diamond formation)
  const getRestPositions = useMemo(() => {
    return (): Record<string, Position> => {
      const restPositions: Record<string, Position> = {};
      const angleOffset = -Math.PI / 2;
      MODES.forEach((mode, i) => {
        const angle = angleOffset + (i * Math.PI * 2) / 4;
        restPositions[mode] = {
          x: LOCK_CENTER.x + Math.cos(angle) * WEB_RADIUS,
          y: LOCK_CENTER.y + Math.sin(angle) * WEB_RADIUS,
        };
      });
      return restPositions;
    };
  }, []);

  // Calculate target positions when dragging (horizontal spread)
  const getTargetPositions = useMemo(() => {
    return (leadMode: string): Record<string, Position> => {
      const targets: Record<string, Position> = {};
      const leadIdx = MODES.indexOf(leadMode);
      const oppositeIdx = (leadIdx + 2) % 4;

      MODES.forEach((mode, i) => {
        if (mode === leadMode) {
          // Lead mode goes to lock zone
          targets[mode] = { x: LOCK_CENTER.x, y: LOCK_CENTER.y };
        } else if (i === oppositeIdx) {
          // Opposite mode goes far right
          targets[mode] = {
            x: LOCK_CENTER.x + 350,
            y: LOCK_CENTER.y,
          };
        } else {
          // Neighbor modes go above/below
          const offset = i > leadIdx ? 120 : -120;
          targets[mode] = {
            x: LOCK_CENTER.x + 250,
            y: LOCK_CENTER.y + offset,
          };
        }
      });
      return targets;
    };
  }, []);

  // Calculate positions with interpolation
  const calculatePositions = useMemo(() => {
    return (
      draggingMode: string | null,
      dragPos: Position,
      rest: Record<string, Position>,
      lockStates: Record<string, boolean>
    ): Record<string, Position> => {
      const calculated: Record<string, Position> = { ...rest };

      if (!draggingMode) return calculated;

      // Distance from drag position to lock center
      const dist = Math.hypot(
        dragPos.x - LOCK_CENTER.x,
        dragPos.y - LOCK_CENTER.y
      );

      // Calculate interpolation factor
      const interpolationRange = LOCK_RADIUS * 3.5;
      const t = Math.max(0, 1 - dist / interpolationRange);

      // Get target positions for this drag
      const targets = getTargetPositions(draggingMode);

      // Interpolate locked modes
      MODES.forEach((mode) => {
        if (lockStates[mode]) {
          // Locked modes stay in lock zone
          calculated[mode] = { x: LOCK_CENTER.x, y: LOCK_CENTER.y };
        } else if (mode !== draggingMode) {
          // Other modes interpolate from rest to target
          const start = rest[mode];
          const end = targets[mode];
          calculated[mode] = {
            x: start.x + (end.x - start.x) * t,
            y: start.y + (end.y - start.y) * t,
          };
        } else {
          // Dragged mode follows cursor
          calculated[mode] = { ...dragPos };
        }
      });

      return calculated;
    };
  }, [getTargetPositions]);

  // Initialize positions
  useEffect(() => {
    const rest = getRestPositions();
    setPositions(rest);
    const initialLocked: Record<string, boolean> = {};
    MODES.forEach((mode) => {
      initialLocked[mode] = false;
    });
    setLocked(initialLocked);
  }, [getRestPositions]);

  // Handle pointer down
  const handlePointerDown = (mode: string, e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setDragging(mode);
    setDragPos(pos);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Handle pointer move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setDragPos(pos);
  };

  // Handle pointer up
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const endPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Check if released near lock zone
    const distToLock = Math.hypot(
      endPos.x - LOCK_CENTER.x,
      endPos.y - LOCK_CENTER.y
    );

    const newLocked = { ...locked };
    const newSelected = [...selectedModes];

    if (distToLock < LOCK_RADIUS) {
      // Lock it
      newLocked[dragging] = true;
      if (!newSelected.includes(dragging)) {
        newSelected.push(dragging);
      }
    } else {
      // Unlock it
      newLocked[dragging] = false;
      const idx = newSelected.indexOf(dragging);
      if (idx > -1) {
        newSelected.splice(idx, 1);
      }
    }

    setLocked(newLocked);
    onModesChange(newSelected);
    onLockStateChange(Object.values(newLocked).some((v) => v));
    setDragging(null);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Animation loop
  useEffect(() => {
    const rest = getRestPositions();
    const animate = () => {
      const newPositions = calculatePositions(dragging, dragPos, rest, locked);
      setPositions(newPositions);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dragging, dragPos, locked, getRestPositions, calculatePositions]);

  return (
    <div className="imode-web-container">
      <canvas
        ref={canvasRef}
        width={1280}
        height={700}
        className="imode-web-canvas"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      <svg className="imode-web-svg" width={1280} height={700}>
        {/* Connection lines */}
        {positions &&
          MODES.map((mode1, i) =>
            MODES.map((mode2, j) =>
              i < j ? (
                <line
                  key={`${mode1}-${mode2}`}
                  x1={positions[mode1]?.x || 0}
                  y1={positions[mode1]?.y || 0}
                  x2={positions[mode2]?.x || 0}
                  y2={positions[mode2]?.y || 0}
                  className="imode-web-line"
                  stroke={`${COLORS[mode1]}40`}
                  strokeWidth="1"
                />
              ) : null
            )
          )}

        {/* Lock zone circle */}
        <circle
          cx={LOCK_CENTER.x}
          cy={LOCK_CENTER.y}
          r={LOCK_SIZE}
          className="imode-web-lock-zone"
          fill="none"
          stroke="rgba(139, 92, 246, 0.2)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>

      {/* Mode circles */}
      {MODES.map((mode) => (
        <div
          key={mode}
          className={`imode-web-mode ${dragging === mode ? "dragging" : ""} ${
            locked[mode] ? "locked" : ""
          }`}
          style={{
            left: `${positions[mode]?.x - I_MODE_RADIUS}px`,
            top: `${positions[mode]?.y - I_MODE_RADIUS}px`,
            backgroundColor: COLORS[mode],
          }}
          onPointerDown={(e) => handlePointerDown(mode, e)}
        >
          <span className="imode-web-mode-label">{mode}</span>
        </div>
      ))}
    </div>
  );
};

export default IModeWeb;
