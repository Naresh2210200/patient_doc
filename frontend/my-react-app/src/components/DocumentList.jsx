import axios from "axios";
import "./DocumentList.css";

const API_BASE = "http://localhost:8000";

export default function DocumentList({ docs, onRefresh }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await axios.delete(`${API_BASE}/documents/${id}`);
        onRefresh();
      } catch (error) {
        alert("Failed to delete document");
      }
    }
  };

  const handleDownload = async (id, filename) => {
    try {
      const response = await axios.get(`${API_BASE}/documents/${id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to download document");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="document-list">
      <h2 className="document-list-title">Uploaded Documents</h2>
      {docs.length === 0 ? (
        <div className="empty-state">
          No documents uploaded yet
        </div>
      ) : (
        <div className="document-grid">
          {docs.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="document-card-header">
                <h4 className="document-filename">{doc.filename}</h4>
                <div className="document-meta">
                  <div className="meta-item">
                    <span className="meta-item-icon">📊</span>
                    <span className="meta-item-label">Size:</span>
                    <span className="meta-item-value">{formatFileSize(doc.file_size)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-item-icon">📅</span>
                    <span className="meta-item-label">Date:</span>
                    <span className="meta-item-value">{formatDate(doc.uploaded_at)}</span>
                  </div>
                </div>
              </div>
              <div className="document-actions">
                <button
                  onClick={() => handleDownload(doc.id, doc.filename)}
                  className="action-button download-button"
                >
                  <span>⬇️</span> Download
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="action-button delete-button"
                >
                  <span>🗑️</span> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
