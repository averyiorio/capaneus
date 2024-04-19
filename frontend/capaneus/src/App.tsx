import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import VerticalEditMenu from "./components/VerticalEditMenu";
import Visualization from "./components/Visualization";
import { bgImg } from "./components/Visualization";
import { fetchPrediction } from "./API";

function App() {
  const [apiData, setApiData] = useState<number[][]>([[]]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPrediction([]);
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const moonboardData: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const bgImage: bgImg = {
    src: "mbrd.jpg",
    scale: 0.162,
    offsetX: -30,
    offsetY: -40,
  };

  const [holds, setHolds] = useState<
    { x: number; y: number; difficulty: number }[]
  >([]);

  const handleHoldsChange = (
    newHolds: { x: number; y: number; difficulty: number }[]
  ) => {
    setHolds(newHolds);
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6 h-[100vh]">
        <h1 className="text-4xl font-bold mb-4 text-black">
          Climbing Route Generator
        </h1>
        <div className="flex gap-4 justify-center">
          <div className="flex bg-white bg-opacity-30 justify-center items-center backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 w-[60rem] maxW-[80rem] h-[40rem] border border-white-70">
            <Visualization data={moonboardData} bgImage={bgImage} onHoldsChange={handleHoldsChange}/>
          </div>
          <VerticalEditMenu holds={holds}/>
        </div>
      </main>
    </>
  );
}

export default App;
