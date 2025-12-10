import { useState } from "react";
import axios from "axios";
import "./UploadForm.css";

const API_BASE = "http://localhost:8000";

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMsg("Please select a PDF file!");
      return;
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setMsg("Only PDF files are allowed!");
      return;
    }

    setUploading(true);
    setMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_BASE}/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMsg("✓ Uploaded successfully!");
      setFile(null);
      // Reset file input
      e.target.reset();
      onUpload();
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg(err.response?.data?.error || "Upload failed! Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-form">
      <h2 className="upload-form-title">Upload PDF Document</h2>
      <form onSubmit={handleUpload}>
        <div className="upload-input-wrapper">
          <div className="file-input-wrapper">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setMsg("");
              }}
              disabled={uploading}
              className="file-input"
            />
          </div>
          <button 
            type="submit" 
            disabled={uploading || !file}
            className="upload-button"
          >
            {uploading ? "⏳ Uploading..." : "⬆️ Upload"}
          </button>
        </div>
        {file && (
          <div className="file-info">
            <span className="meta-item-icon">📎</span>
            <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
          </div>
        )}
        {msg && (
          <div className={`message ${msg.includes("✓") || msg.includes("successfully") ? "message-success" : "message-error"}`}>
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}
