// VerticalEditMenu.tsx

import React from 'react';

const VerticalEditMenu: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
    <h2 className="text-xl font-bold mb-4 ">Adjust Routes</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-md font-medium mb-2">Version</label>
          <select className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="2017">2017</option>
            <option value="2017">2019</option>
            <option value="2017">2024</option>
          </select>
        </div>
        <div>
          <label className="block text-md font-medium mb-2">Difficulty</label>
          <div className="flex items-center">
            <span className="text-sm mr-2">V1</span>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              defaultValue="1"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm ml-2">V7</span>
          </div>
        </div>
        <div>
          <label className="block text-md font-medium mb-2">Difficulty Legend</label>
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
      </div>
    </div>
  );
};

export default VerticalEditMenu;