import { useState } from "react";
import generateSchema from "json-schema-generator";

const JsonToSchema = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [schemaOutput, setSchemaOutput] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const convertJsonToSchema = () => {
        const trimmedInput = jsonInput.trim();
        if (!trimmedInput) {
            setError("Please enter valid JSON.");
            return;
        }

        try {
            setError("");
            setSchemaOutput("");
            setCopied(false);

            const parsedJson = JSON.parse(trimmedInput);
            const schema = generateSchema(parsedJson);

            setSchemaOutput(JSON.stringify(schema, null, 2));
        } catch (err) {
            setError("Invalid JSON input: " + err.message);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(schemaOutput);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setError("Failed to copy to clipboard");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 p-4 flex flex-col items-center justify-start pt-20">
            <h3 className="text-cyan-400 text-2xl mb-4">JSON to JSON Schema Generator</h3>

            <div style={{ maxWidth: "1000px", width: "100%" }}>

            <textarea
                className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300"
                rows="8"
                placeholder='Enter JSON (e.g. { "name": "John", "age": 30 } or [ { "name": "John" } ])'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
            />

            <button
                onClick={convertJsonToSchema}
                style={{ marginTop: "10px", padding: "6px 12px" }}
                className="text-center bg-cyan-700 hover:bg-cyan-600 text-white border-2 border-cyan-500 rounded-l p-1 transition"
            >
                Generate Schema
            </button>

            {schemaOutput && (
                <button
                    onClick={copyToClipboard}
                    style={{ marginTop: "10px", padding: "6px 12px" }}
                    className="text-center bg-cyan-700 hover:bg-cyan-600 text-white border-2 border-cyan-500 ml-3 rounded-l p-1 transition"
                >
                    {copied ? "Copied ✅" : "Copy Output"}
                </button>
            )}

            {schemaOutput && (
                <div style={{ marginTop: "10px" }}>
                    <strong className="text-cyan-300">Generated Schema:</strong>
                    <pre
                        className="border border-cyan-600"
                        style={{
                            background: "#1e293b",
                            padding: "10px",
                            borderRadius: "4px",
                            whiteSpace: "pre-wrap",
                            overflow: "scroll",
                            color: "#06b6d4"
                        }}
                    >
                        {schemaOutput}
                    </pre>
                </div>
            )}

            {error && (
                <div style={{ marginTop: "10px", color: "#f87171" }}>
                    {error}
                </div>
            )}
            </div>
        </div>
    );
};

export default JsonToSchema;
