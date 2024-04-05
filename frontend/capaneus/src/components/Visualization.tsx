import { useEffect, useRef } from "react";

const Visualization = ({ data }: { data: number[][] }) => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  const cellSize = 32;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const gridWidth = data.length;
    const gridHeight = data[0].length;

    const colorScheme = [
      "#FFFFFF", // V0
      "#4CAF50", // V1 (green)
      "#FFEB3B", // V2 (yellow)
      "#FF9800", // V3 (orange)
      "#F44336", // V4 (red)
      "#9C27B0", // V5 (purple)
      "#2196F3", // V6 (blue)
      "#9E9E9E", // V7 (gray)
      "#0097A7", // V8
      "#00838F", // V9
      "#006064", // V10
    ];

    for (let row = 0; row < gridWidth; row++) {
      for (let col = 0; col < gridHeight; col++) {
        const value = Math.floor(data[row][col]);
        if (ctx) {
          ctx.fillStyle = colorScheme[value];
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

          ctx.fillStyle = value > 5 ? "#FFFFFF" : "#000000";
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            value.toFixed(0).toString(),
            col * cellSize + cellSize / 2,
            row * cellSize + cellSize / 2
          );
        }
      }
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={data[0].length * cellSize}
        height={data.length * cellSize}
      />
    </div>
  );
};

export default Visualization;
