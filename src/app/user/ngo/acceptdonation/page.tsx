"use client";

import React, { useEffect, useState } from "react";

type Donation = {
  _id: string;
  donorName?: string;
  item?: string;
  title?: string;
  quantity?: string | number;
  address?: string;
  contactNumber?: string;
  status?: string;
};

const ACCEPTED_URL = "http://localhost:5000/api/donation/accepted";
const UPDATE_BASE = "http://localhost:5000/api/donation";

export default function AcceptDonationPageClient() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let mounted = true;
    const fetchList = async () => {
      try {
        const res = await fetch(ACCEPTED_URL);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const json = await res.json();
        const list: Donation[] = Array.isArray(json) ? json : json.donations ?? json;
        if (mounted) setDonations(list || []);
      } catch (err) {
        console.error("Error fetching accepted donations:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchList();
    return () => { mounted = false; };
  }, []);

  const setProcessing = (id: string, on: boolean) => {
    setProcessingIds(prev => {
      const copy = new Set(prev);
      if (on) copy.add(id); else copy.delete(id);
      return copy;
    });
  };

  const handleMarkDelivered = async (id: string) => {
    if (processingIds.has(id)) return;
    setProcessing(id, true);
    try {
      const res = await fetch(`${UPDATE_BASE}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "delivered" }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      // Remove from UI
      setDonations(prev => prev.filter(d => d._id !== id));
    } catch (err) {
      console.error("Error marking delivered:", err);
      alert("Failed to mark as delivered. See console for details.");
    } finally {
      setProcessing(id, false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading accepted donations…</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Accepted Donations</h1>

      {donations.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No accepted donations yet.</p>
      ) : (
        <div style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
        }}>
          {donations.map(d => (
            <div key={d._id} style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: 16,
              background: "#fff",
              minHeight: 180,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}>
              <div>
                <h3 style={{ margin: "0 0 8px" }}>{d.title ?? d.item ?? d.foodType ?? "Donation"}</h3>
                <p style={{ margin: 4 }}><strong>Quantity:</strong> {d.quantity ?? "-"}</p>
                <p style={{ margin: 4 }}><strong>Donor/Contact:</strong> {d.donorName ?? d.contactNumber ?? "-"}</p>
                <p style={{ margin: 4 }}><strong>Address:</strong> {d.address ?? "-"}</p>
                <p style={{ margin: 4 }}><strong>Status:</strong> {d.status ?? "accepted"}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
                <button
                  onClick={() => handleMarkDelivered(d._id)}
                  disabled={processingIds.has(d._id)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: processingIds.has(d._id) ? "not-allowed" : "pointer",
                  }}
                >
                  {processingIds.has(d._id) ? "Processing…" : "Mark as Delivered"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
