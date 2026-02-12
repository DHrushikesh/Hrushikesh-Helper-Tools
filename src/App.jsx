import { Outlet, Link } from "react-router-dom";
function App() {
  return (
    <div className="flex flex-col items-center justify-between border-2 border-green h-100dvh">
      <h1 className="flex flex-col justify-center text-bold text-purple-800 text-2xl mb-3">CONVERSION TOOLS</h1>
       <nav >
          <Link className="text-2xl hover:bg-green-400 border border-black rounded-lg px-1" to="/sha256">SHA256</Link> |{" "}
          <Link className="text-2xl hover:bg-green-400 border border-black rounded-lg px-1" to="/hash">Hex → ASCII</Link>
        </nav>
      <hr />
      <Outlet />
    </div>
  );
}
export default App;