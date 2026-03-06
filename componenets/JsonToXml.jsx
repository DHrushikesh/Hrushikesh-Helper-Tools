import { useState } from "react";
import xml2js from "xml2js";
import { Link } from "react-router-dom";
import { FaRetweet } from "react-icons/fa";

function JsonToXml() {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = async () => {
    try {
      setError("");
      const jsonObj = JSON.parse(jsonInput);
      const builder = new xml2js.Builder();
      const result = builder.buildObject(jsonObj);
      setXmlOutput(result);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlOutput);
  };

  const handleClear = () => {
    setJsonInput("");
    setXmlOutput("");
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-gradient-to-b from-slate-900 to-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">JSON to XML</h1>

      <div className="flex gap-4 w-full max-w-4xl">
        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2 text-cyan-300">
            JSON Input:
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-84 p-3 border-2 border-cyan-500 rounded-lg font-mono text-sm bg-gray-800 text-cyan-300"
            placeholder="Paste your JSON here..."
          />
        </div>
        <Link className="flex justify-center items-center " to="/xml-json">
          <button
            type="button"
            className="cursor-pointer border-2 text-2xl border-cyan-600 h-fit rounded-2xl mx p-2 bg-cyan-700 hover:bg-cyan-600 text-white transition"
          >
            <FaRetweet />
          </button>
        </Link>
        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2 text-cyan-300">
            XML Output:
          </label>
          <textarea
            value={xmlOutput}
            readOnly
            className="w-full h-84 p-3 border-2 border-cyan-500 rounded-lg font-mono text-sm bg-gray-800 text-cyan-300"
            placeholder="XML output will appear here..."
          />
        </div>
      </div>

      {error && <p className="text-red-400 mt-2 font-semibold">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleConvert}
          className="px-6 py-2 bg-cyan-700 text-white font-bold rounded-lg hover:bg-cyan-600 transition"
        >
          Convert
        </button>
        <button
          onClick={handleCopy}
          disabled={!xmlOutput}
          className="px-6 py-2 bg-cyan-700 text-white font-bold rounded-lg hover:bg-cyan-600 transition disabled:opacity-50"
        >
          Copy
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-cyan-700 text-white font-bold rounded-lg hover:bg-cyan-600 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default JsonToXml;
