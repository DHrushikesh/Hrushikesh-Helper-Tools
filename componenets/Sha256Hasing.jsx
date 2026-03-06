import { useState } from "react";
import { PiRainbowCloudFill } from "react-icons/pi";
function Sha256Hashing() {
    const [input, setInput] = useState("");
    const [hash, setHash] = useState("");
    const [copied, setCopied] = useState(false);
    const generateHash = async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        setHash(hashHex);
    };
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 p-4 flex flex-col items-center justify-start pt-20">
            <h3 className="inline text-cyan-400 text-2xl mb-4">SHA-256 Hash Generator</h3>
            <div style={{ maxWidth: "1000px", width: "100%" }}>
            <textarea
                className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300"
                rows="4"
                placeholder="Enter text..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
            />
            <button
                onClick={generateHash}
                style={{ marginTop: "10px", padding: "6px 12px" }}
                className="text-center bg-cyan-700 hover:bg-cyan-600 text-white border-2 border-cyan-500 rounded-l p-1 transition"
            >
                Generate Hash
            </button>
            {hash && (
                <button onClick={copyToClipboard}
                    style={{ marginTop: "10px", padding: "6px 12px" }}
                    className="text-center bg-cyan-700 hover:bg-cyan-600 text-white border-2 border-cyan-500 ml-3 rounded-l p-1 transition"
                >
                    {copied ? "Copied ✅" : "Copy Output"}
                </button>
            )}
            {hash && (
                <div style={{ marginTop: "10px" }}>
                    <strong className="text-cyan-300">SHA-256:</strong>
                    <pre style={{ background: "#1e293b", padding: "10px", color: "#06b6d4", borderRadius: "4px" }}>
                        {hash}
                    </pre>

                </div>
            )}
            </div>
        </div>
    );
}
export default Sha256Hashing;