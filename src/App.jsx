import { Outlet, Link} from "react-router-dom";
import { PiRainbowCloudFill } from "react-icons/pi";
function App() {

  return (
    <>
      
    <div className="flex flex-col items-center justify-between border-2 border-cyan-600 bg-slate-950 h-100dvh">
       <nav className={`flex justify-center w-full gap-4 mt-2 bg-gray-800 rounded-lg p-3`}>
          <Link className="text-2xl text-cyan-300 hover:bg-cyan-700 hover:text-white border-2 border-cyan-500 rounded-lg px-2 transition" to="/sha256">SHA256</Link>
          <Link className="text-2xl text-cyan-300 hover:bg-cyan-700 hover:text-white border-2 border-cyan-500 rounded-lg px-2 transition" to="/hash">Hex → ASCII</Link>
          <Link className="text-2xl text-cyan-300 hover:bg-cyan-700 hover:text-white border-2 border-cyan-500 rounded-lg px-2 transition" to="/json-schema">Json Schema Generator</Link>
          <Link className="text-2xl text-cyan-300 hover:bg-cyan-700 hover:text-white border-2 border-cyan-500 rounded-lg px-2 transition" to="/json-xml">JSON-XML</Link>
          <Link className="text-2xl text-cyan-300 hover:bg-cyan-700 hover:text-white border-2 border-cyan-500 rounded-lg px-2 transition" to="/xml-json">XML-JSON</Link>
          {/* <Link className="text-2xl text-cyan-300 hover:bg-cyan-700 hover:text-white border-2 border-cyan-500 rounded-lg px-2 transition" to="/Hmmm-Praveen"> */}
            {/* <PiRainbowCloudFill /></Link> */}
        </nav>
      <Outlet />
    </div>
    </>
  );
}
export default App;