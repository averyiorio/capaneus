import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import VerticalEditMenu from './components/VerticalEditMenu';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6 h-[100vh]">
        <h1 className="text-4xl font-bold mb-4 text-black">Climbing Route Generator</h1>
        <div className='flex gap-4' >
        <div className="flex bg-white bg-opacity-30 justify-center items-center backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 w-[80rem] h-[40rem]">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="font-semibold px-8 py-4 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Climbing Visualizer to go here
          </button>
        </div>
          <VerticalEditMenu />
        </div>

      </main>
    </>
  );
}

export default App;