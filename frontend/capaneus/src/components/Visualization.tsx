import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { fetchPrediction } from "../API";

export interface bgImg {
  src: string;
  scale: number;
  offsetX: number;
  offsetY: number;
}

interface VisualizationProps {
  onHoldsChange: (
    holds: { x: number; y: number; difficulty: number }[]
  ) => void;
  data: number[][];
  bgImage: bgImg;
  filter: [number,number];

}

const Visualization = ({
  data,
  bgImage,
  onHoldsChange,
  filter,
}: VisualizationProps) => {
  const bgCanvasRef = useRef({} as HTMLCanvasElement);
  const interactiveCanvasRef = useRef({} as HTMLCanvasElement);
  const cellSize = 32;
  const [hoveredSquare, setHoveredSquare] = useState<[number, number] | null>(
    null
  );
  const [selectedSquares, setSelectedSquares] = useState<boolean[][]>(
    Array(data.length)
      .fill(null)
      .map(() => Array(data[0].length).fill(false))
  );
  const [squares, setSquares] = useState<number[][]>(data);
  const [holds, setHolds] = useState<
    { x: number; y: number; difficulty: number }[]
  >([]);

  useEffect(() => {
    onHoldsChange(holds);
  }, [holds]);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const bgCtx = bgCanvas?.getContext("2d");
    const gridWidth = data.length;
    const gridHeight = data[0].length;
    const colorScheme = [
      "#FFFFFF00", // V0
      "#4CAF5050", // V1 (green)
      "#FFEB3B50", // V2 (yellow)
      "#FF980050", // V3 (orange)
      "#F4433650", // V4 (red)
      "#9C27B050", // V5 (purple)
      "#2196F350", // V6 (blue)
      "#9E9E9E50", // V7 (gray)
      "#0097A750", // V8
      "#00838F50", // V9
      "#00606450", // V10
    ];

    const [minValue, maxValue] = filter;

    for (let row = 0; row < gridWidth; row++) {
      for (let col = 0; col < gridHeight; col++) {
        const value = Math.floor(squares[row][col]);
        if (bgCtx) {
          if (value >= minValue && value < Math.min(colorScheme.length, maxValue)) {
            bgCtx.fillStyle = colorScheme[value];
          } else {
            bgCtx.fillStyle = "#FFFFFF00";
          }
          bgCtx.clearRect(col * cellSize, row * cellSize, cellSize, cellSize);
          bgCtx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

          bgCtx.fillStyle = value > 5 ? "#FFFFFF" : "#000000";
        }
      }
    }

    bgCtx!.globalCompositeOperation = "destination-over";
    if (bgCtx && bgImage) {
      const bgImg = new Image();
      bgImg.src = bgImage.src;
      bgImg.onload = () => {
        const scaledWidth = bgImg.width * bgImage.scale;
        const scaledHeight = bgImg.height * bgImage.scale * 1.016;
        const offsetX = bgImage.offsetX;
        const offsetY = bgImage.offsetY;
        bgCtx.drawImage(bgImg, offsetX, offsetY, scaledWidth, scaledHeight);
      };
    }
  }, [data, squares]);

  useEffect(() => {
    const interactiveCanvas = interactiveCanvasRef.current;
    const interactiveCtx = interactiveCanvas?.getContext("2d");

    interactiveCtx!.clearRect(
      0,
      0,
      interactiveCanvas.width,
      interactiveCanvas.height
    );

    if (hoveredSquare) {
      const [row, col] = hoveredSquare;
      interactiveCtx!.fillStyle = "#FFFFFF50";
      interactiveCtx!.fillRect(
        col * cellSize,
        row * cellSize,
        cellSize,
        cellSize
      );
    }

    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[0].length; col++) {
        if (selectedSquares[row][col]) {
          interactiveCtx!.fillStyle = "#FFFFFF50";
          interactiveCtx!.fillRect(
            col * cellSize,
            row * cellSize,
            cellSize,
            cellSize
          );
          interactiveCtx!.strokeStyle = "#3c82f6";
          interactiveCtx!.lineWidth = 3;
          interactiveCtx!.strokeRect(
            col * cellSize,
            row * cellSize,
            cellSize,
            cellSize
          );
        }
      }
    }
  }, [hoveredSquare, selectedSquares]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = interactiveCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);
    setHoveredSquare([row, col]);
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null);
  };

  const handleClick = async (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = interactiveCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);

    setSelectedSquares((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[row][col] = true;
      return newSelected;
    });

    setHolds((prevHolds) => [
      ...prevHolds,
      { x: col, y: row, difficulty: squares[row][col] },
    ]);

    try {
      const data = await fetchPrediction([]);
      setSquares(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteIconClick = async (
    event: React.MouseEvent<SVGElement>,
    row: number,
    col: number
  ) => {
    event.stopPropagation();
    setSelectedSquares((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[row][col] = false;
      return newSelected;
    });

    setHolds((prevHolds) =>
      prevHolds.filter((hold) => hold.x !== col || hold.y !== row)
    );


    if (holds.length == 1) {
      // If no squares are selected, set all values in the squares state to 0
      setSquares(squares.map((row) => row.map(() => 0)));
    } else {
      try {
        const data = await fetchPrediction([]);
        setSquares(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className={`flex justify-center items-center relative`}>
      <canvas
        ref={bgCanvasRef}
        width={data[0].length * cellSize}
        height={data.length * cellSize}
        className="absolute"
      />
      <canvas
        ref={interactiveCanvasRef}
        width={data[0].length * cellSize}
        height={data.length * cellSize}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="absolute"
      />
      {selectedSquares.map((row, rowIndex) =>
        row.map(
          (isSelected, colIndex) =>
            isSelected && (
              <FaTrash
                size={30}
                key={`${rowIndex}-${colIndex}`}
                className={`absolute text-red-500 cursor-pointer opacity-0`}
                style={{
                  left: colIndex * cellSize - cellSize * 5.5,
                  top: rowIndex * cellSize - cellSize * 8.5,
                }}
                onClick={(event) =>
                  handleDeleteIconClick(event, rowIndex, colIndex)
                }
              />
            )
        )
      )}
    </div>
  );
};

export default Visualization;
