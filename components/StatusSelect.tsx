"use client";

import { useState } from "react";

const STATUSES = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
];

interface StatusSelectProps {
  email: {
    _id: string;
    status?: string;
  };
}

export default function StatusSelect({ email }: StatusSelectProps) {
  const initialStatus = email.status ?? "APPLIED";
  const [status, setStatus] = useState(initialStatus);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);

    await fetch(`/api/career-emails/${email._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  }

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      className="border rounded px-2 py-1"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
