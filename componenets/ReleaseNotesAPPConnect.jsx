import { useState } from "react";

export default function ReleaseNotesAPPConnect() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [version, setVersion] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [apiName, setApiName] = useState("");
  const [url, setUrl] = useState("");
  const [request, setRequest] = useState("");
  const [response, setResponse] = useState("");
  const [environment, setEnvironment] = useState("Production");
  const [remarks, setRemarks] = useState("");
  const [description, setDescription] = useState("");

  const apicall = import.meta.env.VITE_API_PROD;

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (!version || !apiName || !url || !request || !response || !description) {
        setError("Please fill all required fields");
        setLoading(false);
        return;
      }

      // Parse JSON fields
      let requestObj, responseObj;
      try {
        requestObj = JSON.parse(request);
        responseObj = JSON.parse(response);
      } catch {
        setError("Request and Response must be valid JSON");
        setLoading(false);
        return;
      }

      const payload = {
        version,
        date,
        apiName,
        url,
        request: requestObj,
        response: responseObj,
        environment,
        remarks,
        Description: description
      };

      const fetchResponse = await fetch(`${apicall}`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      });

      if (!fetchResponse.ok) throw new Error("Download failed");

      const blob = await fetchResponse.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${apiName}-release-notes-${version}.docx`;
      link.click();
      window.URL.revokeObjectURL(downloadUrl);

      setSuccess("Release notes generated successfully!");
      // Reset form
      setVersion("");
      setApiName("");
      setUrl("");
      setRequest("");
      setResponse("");
      setEnvironment("Production");
      setRemarks("");
      setDescription("");
    } catch (err) {
      setError(err.message || "Error generating release notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 p-4 flex flex-col items-center justify-start pt-10">
      <h3 className="text-cyan-400 text-3xl mb-8 font-bold">Release Notes Generator</h3>

      <div style={{ maxWidth: "900px", width: "100%" }} className="p-6 border-2 border-cyan-500 rounded-lg">
        
        {/* API Name & Version */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-cyan-300 block mb-2 font-semibold">API Name *</label>
            <input
              type="text"
              className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300 w-full p-2"
              placeholder="e.g., User API"
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-cyan-300 block mb-2 font-semibold">Version *</label>
            <input
              type="text"
              className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300 w-full p-2"
              placeholder="e.g., 1.0.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
        </div>

        {/* Date & Environment */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-cyan-300 block mb-2 font-semibold">Release Date</label>
            <input
              type="date"
              className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300 w-full p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-cyan-300 block mb-2 font-semibold">Environment</label>
            <select
              className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300 w-full p-2"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
            >
              <option value="Development">Development</option>
              <option value="Staging">Staging</option>
              <option value="Production">Production</option>
            </select>
          </div>
        </div>

        {/* API URL */}
        <div className="mb-4">
          <label className="text-cyan-300 block mb-2 font-semibold">API URL *</label>
          <input
            type="text"
            className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300 w-full p-2"
            placeholder="e.g., https://api.example.com/users"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-cyan-300 block mb-2 font-semibold">Description *</label>
          <textarea
            className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300 w-full p-2"
            rows="2"
            placeholder="Describe the API functionality"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Request JSON */}
        <div className="mb-4">
          <label className="text-cyan-300 block mb-2 font-semibold">Request JSON *</label>
          <textarea
            className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300 w-full p-2 font-mono text-sm"
            rows="4"
            placeholder='{"userId": "string", "action": "string"}'
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
        </div>

        {/* Response JSON */}
        <div className="mb-4">
          <label className="text-cyan-300 block mb-2 font-semibold">Response JSON *</label>
          <textarea
            className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300 w-full p-2 font-mono text-sm"
            rows="4"
            placeholder='{"success": "boolean", "data": "object"}'
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </div>

        {/* Remarks */}
        <div className="mb-6">
          <label className="text-cyan-300 block mb-2 font-semibold">Remarks</label>
          <textarea
            className="border-2 border-cyan-500 rounded-lg bg-gray-800 text-cyan-300 w-full p-2"
            rows="2"
            placeholder="Additional notes or changes"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900 border-2 border-red-500 rounded-lg text-red-300">
            Its just a Small field Issue please Look into it {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-900 border-2 border-green-500 rounded-lg text-green-300">
            Downloaded {success}
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={loading}
          className="w-full bg-cyan-700 hover:bg-cyan-600 disabled:bg-gray-600 text-white border-2 border-cyan-500 rounded-lg p-3 font-bold transition"
        >
          {loading ? "Generating Release Notes..." : "Download Release Notes"}
        </button>
      </div>
    </div>
  );
}