import { useState } from 'react';
import xml2js from 'xml2js';

function JsonToXml() {
  const [jsonInput, setJsonInput] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = async () => {
    try {
      setError('');
      const jsonObj = JSON.parse(jsonInput);
      const builder = new xml2js.Builder();
      const result = builder.buildObject(jsonObj);
      setXmlOutput(result);
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlOutput);
  };

  const handleClear = () => {
    setJsonInput('');
    setXmlOutput('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">JSON to XML</h1>
      
      <div className="flex gap-4 w-full max-w-4xl">
        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2">JSON Input:</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-96 p-3 border-2 border-gray-300 rounded-lg font-mono text-sm"
            placeholder="Paste your JSON here..."
          />
        </div>

        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2">XML Output:</label>
          <textarea
            value={xmlOutput}
            readOnly
            className="w-full h-96 p-3 border-2 border-gray-300 rounded-lg font-mono text-sm bg-gray-100"
            placeholder="XML output will appear here..."
          />
        </div>
      </div>

      {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleConvert}
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
        >
          Convert
        </button>
        <button
          onClick={handleCopy}
          disabled={!xmlOutput}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Copy
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default JsonToXml;
