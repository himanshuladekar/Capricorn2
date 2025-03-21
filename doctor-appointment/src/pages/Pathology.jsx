"use client"

import { useState } from "react"
import "../styles/PathologyResults.css"

const PathologyResults = () => {
  const [results] = useState([
    {
      id: "1",
      testName: "Complete Blood Count (CBC)",
      date: "2023-03-15",
      doctor: "Dr. Sarah Johnson",
      status: "completed",
      summary: "Normal blood cell counts. No abnormalities detected.",
      details: {
        redBloodCells: "5.0 million/mcL",
        whiteBloodCells: "7,500/mcL",
        platelets: "250,000/mcL",
        hemoglobin: "14.5 g/dL",
        hematocrit: "42%",
      },
    },
    {
      id: "2",
      testName: "Lipid Panel",
      date: "2023-02-28",
      doctor: "Dr. Michael Chen",
      status: "completed",
      summary: "Slightly elevated LDL cholesterol. Recommend dietary changes.",
      details: {
        totalCholesterol: "210 mg/dL",
        ldlCholesterol: "140 mg/dL",
        hdlCholesterol: "45 mg/dL",
        triglycerides: "150 mg/dL",
      },
    },
    {
      id: "3",
      testName: "Thyroid Function Test",
      date: "2023-01-10",
      doctor: "Dr. Emily Rodriguez",
      status: "completed",
      summary: "Normal thyroid function.",
      details: {
        tsh: "2.5 mIU/L",
        t4: "1.2 ng/dL",
        t3: "120 ng/dL",
      },
    },
    {
      id: "4",
      testName: "Urinalysis",
      date: "2023-04-05",
      doctor: "Dr. David Kim",
      status: "pending",
      summary: "Results pending laboratory analysis.",
      details: {},
    },
  ])

  const [selectedResult, setSelectedResult] = useState(null)

  const handleResultClick = (result) => {
    setSelectedResult(result)
  }

  return (
    <div className="pathology-page">
      <h1>Pathology Results</h1>

      <div className="results-container">
        <div className="results-list">
          {results.map((result) => (
            <div
              key={result.id}
              className={`result-card ${selectedResult?.id === result.id ? "selected" : ""} ${result.status === "pending" ? "pending" : ""}`}
              onClick={() => handleResultClick(result)}
            >
              <div className="result-header">
                <h3>{result.testName}</h3>
                <span className={`status-badge ${result.status}`}>
                  {result.status === "completed" ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="result-info">
                <p className="date">
                  {new Date(result.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="doctor">{result.doctor}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="result-details">
          {selectedResult ? (
            <>
              <div className="details-header">
                <h2>{selectedResult.testName}</h2>
                <span className={`status-badge ${selectedResult.status}`}>
                  {selectedResult.status === "completed" ? "Completed" : "Pending"}
                </span>
              </div>

              <div className="details-info">
                <div className="info-row">
                  <span className="label">Date:</span>
                  <span>
                    {new Date(selectedResult.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Doctor:</span>
                  <span>{selectedResult.doctor}</span>
                </div>
              </div>

              <div className="details-summary">
                <h3>Summary</h3>
                <p>{selectedResult.summary}</p>
              </div>

              {selectedResult.status === "completed" && Object.keys(selectedResult.details).length > 0 && (
                <div className="details-metrics">
                  <h3>Test Results</h3>
                  <table className="metrics-table">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(selectedResult.details).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedResult.status === "pending" && (
                <div className="pending-message">
                  <p>This test is still being processed. Results will be available soon.</p>
                </div>
              )}

              <div className="details-actions">
                <button className="download-btn">Download PDF</button>
                <button className="share-btn">Share Results</button>
              </div>
            </>
          ) : (
            <div className="select-result-prompt">
              <p>Select a test result to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PathologyResults

