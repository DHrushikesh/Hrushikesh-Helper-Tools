import { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { Link } from 'react-router-dom';
import { FaRetweet } from "react-icons/fa";

function XmlToJson() {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      setError('');
      const parser = new XMLParser();
      const result = parser.parse(xmlInput);
      setJsonOutput(JSON.stringify(result, null, 2));
    } catch (err) {
      setError('Invalid XML: ' + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  const handleClear = () => {
    setXmlInput('');
    setJsonOutput('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-gradient-to-b from-slate-900 to-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">XML to JSON</h1>
      
      <div className="flex gap-4 w-full max-w-4xl">
        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2 text-cyan-300">XML Input:</label>
          <textarea
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            className="w-full h-84 p-3 border-2 border-cyan-500 rounded-lg font-mono text-sm bg-gray-800 text-cyan-300"
            placeholder="Paste your XML here..."
          />
        </div>

        <Link className='flex justify-center items-center '  to="/json-xml">
        <button type="button" className='cursor-pointer border-2 text-2xl border-cyan-600 h-fit rounded-2xl mx p-2 bg-cyan-700 hover:bg-cyan-600 text-white transition'>
          <FaRetweet />
        </button>
        </Link>

        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2 text-cyan-300">JSON Output:</label>
          <textarea
            value={jsonOutput}
            readOnly
            className="w-full h-84 p-3 border-2 border-cyan-500 rounded-lg font-mono text-sm bg-gray-800 text-cyan-300"
            placeholder="JSON output will appear here..."
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
          disabled={!jsonOutput}
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

export default XmlToJson;
