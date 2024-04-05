import "./App.css";
import Navbar from "./components/Navbar";
import VerticalEditMenu from "./components/VerticalEditMenu";
import Visualization from "./components/Visualization";
//import { fetchPrediction } from "./API";

function App() {

  //const apiData: number[][] = fetchPrediction([]);

  const moonboardData: number[][] = [
    [0, 0, 0, 0, 4.057065290373999, 0, 0, 0, 0, 0, 0],
    [0, 3.5314869540344587, 0, 2.7305513675768274, 3.3082320112396992, 4.106795965940347, 3.550337658027144, 0, 0, 0, 0],
    [0, 3.743139435046587, 3.577789721423143, 3.242542406078472, 0, 0, 2.824045318333193, 0, 0, 0, 0],
    [3.446995247709972, 0, 3.5902026192633802, 3.778036375632663, 0, 0, 0, 3.347945060930212, 0, 0, 0],
    [4.56923221393254, 3.676603986486385, 0, 2.53224755112299, 3.3728542133389356, 3.7556194803358354, 3.7465939509526565, 0, 3.5610214447659767, 0, 4.075650062041868],
    [3.308925409512438, 3.9309109962232767, 3.0, 3.7661981070734734, 3.3488761159198455, 0, 4.186682137324009, 0, 0, 0, 0],
    [3.130414107534859, 3.5876594806299713, 6.60034687206007, 0, 3.4909862777666762, 3.4808184460926204, 4.063315924887243, 0, 0, 4.438525464102497, 0],
    [0, 4.095741732923814, 0, 4.139991147401033, 3.3380471849116193, 4.070537030393836, 3.7328971324592786, 0, 0, 4.626337914827889, 0],
    [5.805043295428205, 3.727987358630659, 4.343038745375678, 3.5505352692356267, 0, 4.588664246949175, 4.298943878367057, 0, 0, 0, 0],
    [4.122097415647005, 0, 3.2987720874553395, 0, 2.903952967567417, 0, 3.5220742008023755, 3.4843962548822005, 0, 4.83857346684146, 0],
    [3.7597464904491784, 3.8849393505025605, 0, 3.460818960262503, 0, 3.5887078260194545, 3.929959112026393, 0, 4.092538697600597, 5.2499758234839335, 0],
    [4.33732435077294, 4.2976207903086205, 0, 4.2706196962177785, 3.980078622456933, 3.61501244850671, 3.9627194674362634, 0, 0, 3.66407748791297, 6.60034687206007],
    [4.393702127221197, 7.0, 3.51664456017058, 0, 3.4407284227458774, 4.013930376820457, 4.521656485372837, 0, 3.4577934036987856, 3.4780608420129537, 4.1371131569814725],
    [4.164014881813378, 3.7273532391600948, 3.679746707431472, 0, 0, 0, 3.9007702755126474, 0, 4.328038009954262, 0, 4.333573341479656],
    [4.35459946258792, 0, 0, 0, 0, 4.049339288918157, 0, 4.1515096547568024, 0, 0, 0],
    [3.036290200766671, 4.167364363809369, 0, 0, 0, 0, 0, 0, 5.1655810585296535, 0, 0],
    [0, 0, 0, 0, 0, 4.294810585891997, 0, 0, 0, 0, 0],
  ];
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6 h-[100vh]">
        <h1 className="text-4xl font-bold mb-4 text-black">
          Climbing Route Generator
        </h1>
        <div className="flex gap-4">
          <div className="flex bg-white bg-opacity-30 justify-center items-center backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 w-[80rem] h-[40rem]">
            <Visualization
              data={moonboardData}
            />
          </div>
          <VerticalEditMenu />
        </div>
      </main>
    </>
  );
}

export default App;
