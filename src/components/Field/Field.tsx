import React, { useEffect, useState } from "react";
import Selected from "@/interfaces/Selected";
import fetchData from "@/utils/fetchData";
import Select from "./components/Select";

const Field: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [hoveredCells, setHoveredCells] = useState<string[]>([]);
  const [modes, setModes] = useState<any>([]);
  const [selectedMode, setSelectedMode] = useState<Selected | null>(null);
  const [startGame, setStartGame] = useState<boolean>(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModeId = event.target.value;
    const mode = modes.find(
      (mode: Selected) => parseInt(mode.id) === parseInt(selectedModeId)
    );
    setSelectedMode(mode || null);
  };

  useEffect(() => {
    fetchData(import.meta.env.VITE_API_URL)
      .then((data) => {
        setModes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    renderCells(10);
    setHoveredCells([]);
  }, [selectedMode]);

  const handleCellClick = (cell: string) => {
    setSelectedCell(cell);
  };

  const handleCellHover = (cell: string) => {
    if (hoveredCells.includes(cell)) {
      setHoveredCells(hoveredCells.filter((c) => c !== cell));
    } else {
      setHoveredCells([...hoveredCells, cell]);
    }
    setHoveredCell(cell);
  };

  const handleStartGame = () => {
    setStartGame(true);
  };

  const renderCells = (by: number) => {
    const cells: any = [];
    for (let row = 0; row < by; row++) {
      for (let col = 0; col < by; col++) {
        const cell = `${row + 1}, ${col + 1}`;
        const isActive = selectedCell === cell;
        const isHovered = hoveredCell === cell;
        const isToggled = hoveredCells.includes(cell);
        const backgroundColor = isActive
          ? "#ffcccb"
          : isHovered
          ? "#f0e68c"
          : isToggled
          ? "#04A9F4"
          : "#fff";
        cells.push(
          <div
            key={`${row}-${col}`}
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #000",
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: backgroundColor,
              cursor: "pointer",
            }}
            onClick={() => handleCellClick(cell)}
            onMouseEnter={() => handleCellHover(cell)}
            onMouseLeave={() => handleCellHover("")}
          ></div>
        );
      }
    }
    return cells;
  };

  return (
    <>
      <main>
        <div className="square">
          <div className="square_modes">
            <h1>Modes</h1>
            <Select
              label={"Select mode"}
              value={modes}
              onChange={handleSelectChange}
            />
            <button onClick={handleStartGame}>Start</button>
          </div>
          {startGame && selectedMode ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${selectedMode.field}, 53px)`,
                gridAutoColumns: `minmax(1400px, 1fr)`,
                gap: "1px",
              }}
            >
              {renderCells(selectedMode.field)}
            </div>
          ) : null}
        </div>
        <div className="hovered">
          <h1>Hovered squares</h1>
          <div className="hovered_inner">
            {hoveredCells
              ? hoveredCells.map((cell) => (
                  <div key={cell}>
                    {cell.length > 0
                      ? `row: ${cell.split(",")[0]} col: ${cell.split(",")[1]}`
                      : null}
                  </div>
                ))
              : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default Field;
