import { useState } from "react";
const HexToAscii = () => {
    const [hex, setHex] = useState("");
    const [ascii, setAscii] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const convertHexToAscii = () => {
        try {
            setError("");
            setAscii("");
            setCopied(false);
            const cleanHex = hex.replace(/\s+/g, "");
            if (!/^[0-9a-fA-F]*$/.test(cleanHex)) {
                throw new Error("Invalid hex characters");
            }
            if (cleanHex.length % 2 !== 0) {
                throw new Error("Hex length must be even");
            }
            let result = "";
            for (let i = 0; i < cleanHex.length; i += 2) {
                result += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
            }
            setAscii(result);
        } catch (err) {
            setError(err.message);
        }
    };
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(ascii);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setError("Failed to copy to clipboard");
        }
    };
    return (
        <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
            <h3>Hex to ASCII Converter</h3>
            <textarea
                className="border-2 border-black rounded-lg"
                rows="5"
                placeholder="Enter hex data (e.g. 48656c6c6f)"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
            />
            <button
                onClick={convertHexToAscii}
                style={{ marginTop: "10px", padding: "6px 12px" }}
                className="text-center bg-gray-400 border-2 rounded-l p-1"
            >
                Convert
            </button>
            {ascii && (
                <button
                    onClick={copyToClipboard}
                    style={{ marginTop: "10px", padding: "6px 12px" }}
                    className="text-center bg-gray-400 border-2 ml-3 rounded-l p-1"
                >
                    {copied ? "Copied ✅" : "Copy Output"}
                </button>)}
            {ascii && (
                <div style={{ marginTop: "10px" }}>
                    <strong>ASCII Output:</strong>
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
                        {ascii}
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
export default HexToAscii;