import { Outlet, Link} from "react-router-dom";
import { PiRainbowCloudFill } from "react-icons/pi";
function App() {

  return (
    <>
    
      <p className="flex flex-col justify-center text-bold text-purple-800 text-center p-4 text-2xl mb-3">CONVERSION TOOLS</p>
      
    <div className="flex flex-col items-center justify-between border-2 border-green h-100dvh">
       <nav className={`flex justify-center w-full gap-4 mt-2`}>
          <Link className="text-2xl hover:bg-green-400 border-2 border-teal-600  rounded-lg px-1" to="/sha256">SHA256</Link>
          <Link className="text-2xl hover:bg-green-400 border-2 border-teal-600 rounded-lg px-1" to="/hash">Hex → ASCII</Link>
          <Link className="text-2xl hover:bg-green-400 border-2 border-teal-600 rounded-lg px-1" to="/json-schema">Json Schema Generator</Link>
          <Link className="text-2xl hover:bg-green-400 border-2 border-teal-600 rounded-lg px-1" to="/json-xml">JSON-XML</Link>
          <Link className="text-2xl hover:bg-green-400 border-2 border-teal-600 rounded-lg px-1" to="/xml-json">XML-JSON</Link>
          <Link className="text-2xl hover:bg-green-400 border-2 border-teal-600 rounded-lg px-1" to="/Hmmm-Praveen">
            <PiRainbowCloudFill /></Link>
        </nav>
      <Outlet />
    </div>
    </>
  );
}
export default App;