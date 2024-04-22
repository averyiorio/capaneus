import React, { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";

interface VerticalEditMenuProps {
  holds: { x: number; y: number; difficulty: number }[];
  onFilterRangeChange: (range: [number, number]) => void;
}

const VerticalEditMenu: React.FC<VerticalEditMenuProps> = ({
  holds,
  onFilterRangeChange,
}) => {
  const [avgDifficulty, setAvgDifficulty] = useState(0);
  const [bgColor, setBgColor] = useState("");
  const [filterRange, setFilterRange] = useState<[number, number]>([0, 7]);
  const difficultyColors = [
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-blue-500",
    "bg-gray-500",
  ];

  useEffect(() => {
    if (holds.length > 0) {
      const sum = holds.reduce((acc, hold) => acc + hold.difficulty, 0);
      const avg = sum / holds.length;
      setAvgDifficulty(Number(avg.toFixed(1)));

      const lowIndex = Math.floor(avg - 1);
      const highIndex = Math.ceil(avg - 1);
      const lowColor = difficultyColors[lowIndex];
      const highColor = difficultyColors[highIndex];
      const interpolationFactor = avg - lowIndex - 1;

      setBgColor(
        `bg-gradient-to-r ${lowColor} ${
          interpolationFactor * 100
        }%, ${highColor} ${interpolationFactor * 100}%`
      );
    } else {
      setAvgDifficulty(0);
      setBgColor("");
    }
  }, [holds]);

  useEffect(() => {
    onFilterRangeChange(filterRange);
  }, [filterRange]);

  return (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 border border-white-70">
      <h2 className="text-xl font-bold mb-4">Route Info</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-md font-medium mb-2">Version</label>
          <select className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="2017">2016</option>
            {/* <option value="2017">2019</option>
            <option value="2017">2024</option> */}
          </select>
        </div>
        <div>
          <label className="block text-md font-medium mb-2">
            Average Difficulty
          </label>
          <div
            className={`inline-block px-4 py-2 rounded-md ${bgColor} bg-opacity-50`}
          >
            <span className="text-4xl font-bold text-white">{`V${avgDifficulty}`}</span>
          </div>
        </div>
        <div>
          <label className="block text-md font-medium mb-2">
            Difficulty Legend
          </label>
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span className="text-sm">V1</span>
            <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
            <span className="text-sm">V2</span>
            <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
            <span className="text-sm">V3</span>
            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
            <span className="text-sm">V4</span>
            <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
            <span className="text-sm">V5</span>
            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            <span className="text-sm">V6</span>
            <div className="w-4 h-4 bg-gray-500 rounded-sm"></div>
            <span className="text-sm">V7</span>
          </div>
        </div>
        <div>
          <label className="block text-md font-medium mb-2">
            Difficulty Filter
          </label>
          <Slider.Root
            className="relative flex items-center w-full h-4 select-none"
            value={filterRange}
            min={1}
            max={7}
            step={1}
            minStepsBetweenThumbs={1}
            onValueChange={(value) => setFilterRange(value as [number, number])}
          >
            <Slider.Track className="bg-gray-200 relative flex-1 h-1 rounded-full">
              <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 bg-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <Slider.Thumb className="block w-4 h-4 bg-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Slider.Root>
          <div className="flex justify-between text-sm mt-2">
            <span>V{filterRange[0]}</span>
            <span>V{filterRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalEditMenu;
