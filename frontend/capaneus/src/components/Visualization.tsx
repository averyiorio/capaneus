import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";

export interface bgImg {
  src: string;
  scale: number;
  offsetX: number;
  offsetY: number;
}

interface VisualizationProps {
  data: number[][];
  images: string[]; // Array of image URLs
  bgImage: bgImg;
}

const Visualization = ({ data, images, bgImage }: VisualizationProps) => {
  const bgCanvasRef = useRef({} as HTMLCanvasElement);
  const interactiveCanvasRef = useRef({} as HTMLCanvasElement);
  const cellSize = 32;
  const [hoveredSquare, setHoveredSquare] = useState<[number, number] | null>(null);
  const [selectedSquares, setSelectedSquares] = useState<boolean[][]>(
    Array(data.length).fill(null).map(() => Array(data[0].length).fill(false))
  );

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

    for (let row = 0; row < gridWidth; row++) {
      for (let col = 0; col < gridHeight; col++) {
        const value = Math.floor(data[row][col]);
        if (bgCtx) {
          bgCtx.fillStyle = colorScheme[value];
          bgCtx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

          if (images[value]) {
            const image = new Image();
            image.src = images[value];
            image.onload = () => {
              bgCtx.drawImage(image, col * cellSize, row * cellSize, cellSize, cellSize);
            };
          }

          bgCtx.fillStyle = value > 5 ? "#FFFFFF" : "#000000";
          bgCtx.font = "12px Arial";
          bgCtx.textAlign = "center";
          bgCtx.textBaseline = "middle";
        }
      }
    }

    bgCtx!.globalCompositeOperation = 'destination-over';
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
  }, [data, images]);

  useEffect(() => {
    const interactiveCanvas = interactiveCanvasRef.current;
    const interactiveCtx = interactiveCanvas?.getContext("2d");

    interactiveCtx!.clearRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);

    if (hoveredSquare) {
      const [row, col] = hoveredSquare;
      interactiveCtx!.fillStyle = "#FFFFFF50";
      interactiveCtx!.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }

    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[0].length; col++) {
        if (selectedSquares[row][col]) {
          interactiveCtx!.fillStyle = "#FFFFFF50";
          interactiveCtx!.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          interactiveCtx!.strokeStyle = "#3c82f6";
          interactiveCtx!.lineWidth = 3;
          interactiveCtx!.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);


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

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
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
  };

  const handleDeleteIconClick = (event: React.MouseEvent<SVGElement>, row: number, col: number) => {
    event.stopPropagation();
    setSelectedSquares((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[row][col] = false;
      return newSelected;
    });
  };

  return (
    <div className="flex justify-center items-center relative">
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
        row.map((isSelected, colIndex) =>
          isSelected && (
            <FaTrash
              size={30}
              key={`${rowIndex}-${colIndex}`}
              className={`absolute text-red-500 cursor-pointer opacity-0`}
              style={{
                left: (colIndex * cellSize)-(cellSize*5.5),
                top: (rowIndex * cellSize) -(cellSize*8.5),
              }}
              onClick={(event) => handleDeleteIconClick(event, rowIndex, colIndex)}
            />
          )
        )
      )}
    </div>
  );
};

export default Visualization;