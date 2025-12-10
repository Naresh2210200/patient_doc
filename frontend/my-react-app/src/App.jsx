import { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "./components/UploadForm";
import DocumentList from "./components/DocumentList";
import "./App.css";

const API_BASE = "http://localhost:8000";

function App() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/documents`);
      setDocuments(response.data);
    } catch (err) {
      setError("Failed to load documents. Make sure the backend server is running.");
      console.error("Error fetching documents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1>🏥 Patient Document Portal</h1>
          <p className="subtitle">Manage your medical PDF documents</p>
        </header>
        
        <UploadForm onUpload={fetchDocuments} />
        
        {loading && (
          <div className="loading-state">
            Loading documents
          </div>
        )}
        
        {error && (
          <div className="error-state">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <DocumentList docs={documents} onRefresh={fetchDocuments} />
        )}
      </div>
    </div>
  );
}

export default App;
