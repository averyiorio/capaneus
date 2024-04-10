import { useEffect, useRef } from "react";

interface VisualizationProps {
  data: number[][];
  images: string[]; // Array of image URLs
}

const Visualization = ({ data, images }: VisualizationProps) => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  const cellSize = 32;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
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

    for (let row = 0; row < gridWidth; row++) {
      for (let col = 0; col < gridHeight; col++) {
        const value = Math.floor(data[row][col]);
        if (ctx) {
          ctx.fillStyle = colorScheme[value];
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

          if (images[value]) {
            const image = new Image();
            image.src = images[value];
            image.onload = () => {
              ctx.drawImage(
                image,
                col * cellSize,
                row * cellSize,
                cellSize,
                cellSize
              );
            };
          }

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
  }, [data, images]);

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
