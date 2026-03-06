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
        <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 p-4 flex flex-col items-center justify-start pt-20">
            <h3 className="text-cyan-400 text-2xl mb-4">Hex to ASCII Converter</h3>
            <div style={{ maxWidth: "1000px", width: "100%" }}>
            <textarea
                className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300"
                rows="5"
                placeholder="Enter hex data (e.g. 48656c6c6f)"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
            />
            <button
                onClick={convertHexToAscii}
                style={{ marginTop: "10px", padding: "6px 12px" }}
                className="text-center bg-cyan-700 hover:bg-cyan-600 text-white border-2 border-cyan-500 rounded-l p-1 transition"
            >
                Convert
            </button>
            {ascii && (
                <button
                    onClick={copyToClipboard}
                    style={{ marginTop: "10px", padding: "6px 12px" }}
                    className="text-center bg-cyan-700 hover:bg-cyan-600 text-white border-2 border-cyan-500 ml-3 rounded-l p-1 transition"
                >
                    {copied ? "Copied ✅" : "Copy Output"}
                </button>)}
            {ascii && (
                <div style={{ marginTop: "10px" }}>
                    <strong className="text-cyan-300">ASCII Output:</strong>
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
                        {ascii}
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
export default HexToAscii;