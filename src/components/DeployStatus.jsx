import React from 'react';
import { X, CheckCircle, Cloud, Terminal, ShieldCheck, Server } from 'lucide-react';
import './DeployStatus.css';

export default function DeployStatus({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content deploy-modal animate-fade-in" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="deploy-header">
          <Cloud size={32} color="#3b82f6" />
          <div>
            <h3>Google Cloud Run Ready</h3>
            <p className="deploy-subtitle">Containerized with Multi-Stage Docker & Nginx SPA Configuration</p>
          </div>
        </div>

        <div className="deploy-body">
          <div className="status-badge-row">
            <span className="status-badge"><CheckCircle size={16} color="#10b981" /> Container Build Verified</span>
            <span className="status-badge"><CheckCircle size={16} color="#10b981" /> Nginx PORT Template Ready</span>
            <span className="status-badge"><CheckCircle size={16} color="#10b981" /> Dynamic Port Binding</span>
          </div>

          <h4 className="deploy-section-title"><Terminal size={16} /> Deploy via gcloud CLI</h4>
          <div className="code-block">
            <pre>
{`# 1. Build and Submit Container Image to Google Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/moviesync:latest .

# 2. Deploy directly to Google Cloud Run (Port automatically bound to $PORT)
gcloud run deploy moviesync \\
  --image gcr.io/YOUR_PROJECT_ID/moviesync:latest \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated`}
            </pre>
          </div>

          <h4 className="deploy-section-title"><Server size={16} /> Local Docker Test Command</h4>
          <div className="code-block">
            <pre>
{`# Test Cloud Run environment variable PORT binding locally
docker build -t moviesync:latest .
docker run -e PORT=8080 -p 8080:8080 moviesync:latest`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
