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
        <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
            <h3 className="inline">SHA-256 Hash Generator</h3>
            <textarea
                className="border-2 border-black rounded-lg"
                rows="4"
                placeholder="Enter text..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
            />
            <button
                onClick={generateHash}
                style={{ marginTop: "10px", padding: "6px 12px" }}
                className="text-center bg-gray-400 border-2 rounded-l p-1"
            >
                Generate Hash
            </button>
            {hash && (
                <button onClick={copyToClipboard}
                    style={{ marginTop: "10px", padding: "6px 12px" }}
                    className="text-center bg-gray-400 border-2 ml-3 rounded-l p-1"
                >
                    {copied ? "Copied ✅" : "Copy Output"}
                </button>
            )}
            {hash && (
                <div style={{ marginTop: "10px" }}>
                    <strong>SHA-256:</strong>
                    <pre style={{ background: "#f4f4f4", padding: "10px" }}>
                        {hash}
                    </pre>

                </div>
            )}
        </div>
    );
}
export default Sha256Hashing;