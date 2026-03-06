import { Outlet, Link, useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  const isRootPath = location.pathname === '/';

  return (
    <>
    
      <p className="flex flex-col justify-center text-bold text-purple-800 text-center p-4 text-2xl mb-3">CONVERSION TOOLS</p>
      
    <div className="flex items-center justify-between border-2 border-green h-100dvh">
       <nav className={`flex ${isRootPath ? 'justify-center w-full' : 'fixed left-0'} border border-black flex-col`}>
          <Link className="text-2xl hover:bg-green-400  rounded-lg px-1" to="/sha256">SHA256</Link>
          <Link className="text-2xl hover:bg-green-400  rounded-lg px-1" to="/hash">Hex → ASCII</Link>
          <Link className="text-2xl hover:bg-green-400  rounded-lg px-1" to="/json-schema">Json Schema Generator</Link>
          <Link className="text-2xl hover:bg-green-400  rounded-lg px-1" to="/json-xml">JSON-XML</Link>
          <Link className="text-2xl hover:bg-green-400  rounded-lg px-1" to="/xml-json">XML-JSON</Link>
        </nav>
      <Outlet />
    </div>
    </>
  );
}
export default App;