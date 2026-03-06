import { useState } from 'react';
import xml2js from 'xml2js';
import { Link } from 'react-router-dom';

function XmlToJson() {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = async () => {
    try {
      setError('');
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(xmlInput);
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
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">XML to JSON</h1>
      
      <div className="flex gap-4 w-full max-w-4xl">
        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2">XML Input:</label>
          <textarea
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            className="w-full h-96 p-3 border-2 border-gray-300 rounded-lg font-mono text-sm"
            placeholder="Paste your XML here..."
          />
        </div>

        <Link className='flex justify-center items-center '  to="/json-xml">
        <button type="button" className='cursor-pointer border-2 border-teal-700 h-fit rounded-2xl mx p-2 bg-teal-600 text-white'>Invert</button>
        </Link>

        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2">JSON Output:</label>
          <textarea
            value={jsonOutput}
            readOnly
            className="w-full h-96 p-3 border-2 border-gray-300 rounded-lg font-mono text-sm bg-gray-100"
            placeholder="JSON output will appear here..."
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
          disabled={!jsonOutput}
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

export default XmlToJson;
