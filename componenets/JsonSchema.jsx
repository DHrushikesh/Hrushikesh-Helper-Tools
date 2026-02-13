import { useState } from "react";
import generateSchema from "json-schema-generator";

const JsonToSchema = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [schemaOutput, setSchemaOutput] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const convertJsonToSchema = () => {
        try {
            setError("");
            setSchemaOutput("");
            setCopied(false);

            const parsedJson = JSON.parse(jsonInput);
            const schema = generateSchema(parsedJson);

            setSchemaOutput(JSON.stringify(schema, null, 2));
        } catch (err) {
            setError("Invalid JSON input",err);
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
        <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
            <h3>JSON to JSON Schema Generator</h3>

            <textarea
                className="border-2 border-black rounded-lg"
                rows="8"
                placeholder='Enter JSON (e.g. { "name": "John", "age": 30 })'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
            />

            <button
                onClick={convertJsonToSchema}
                style={{ marginTop: "10px", padding: "6px 12px" }}
                className="text-center bg-gray-400 border-2 rounded-l p-1"
            >
                Generate Schema
            </button>

            {schemaOutput && (
                <button
                    onClick={copyToClipboard}
                    style={{ marginTop: "10px", padding: "6px 12px" }}
                    className="text-center bg-gray-400 border-2 ml-3 rounded-l p-1"
                >
                    {copied ? "Copied ✅" : "Copy Output"}
                </button>
            )}

            {schemaOutput && (
                <div style={{ marginTop: "10px" }}>
                    <strong>Generated Schema:</strong>
                    <pre
                        className="border border-green-500"
                        style={{
                            background: "#f4f4f4",
                            padding: "10px",
                            borderRadius: "4px",
                            whiteSpace: "pre-wrap",
                            overflow: "scroll"
                        }}
                    >
                        {schemaOutput}
                    </pre>
                </div>
            )}

            {error && (
                <div style={{ marginTop: "10px", color: "red" }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default JsonToSchema;
