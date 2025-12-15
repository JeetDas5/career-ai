"use client";

import StatusSelect from "./StatusSelect";

interface EmailTableProps {
    emails: {
      _id: string;
      company?: string;
      role?: string;
      status?: string;
      confidence?: number;
      receivedAt?: string;
    }[]
}

export default function EmailTable({ emails }: EmailTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Confidence</th>
            <th className="p-3">Received</th>
          </tr>
        </thead>

        <tbody>
          {emails.map((email) => {
            const status = email.status ?? "APPLIED";
            const confidenceDisplay =
              email.confidence != null
                ? `${(email.confidence * 100).toFixed(0)}%`
                : "—";
            const receivedDisplay = email.receivedAt
              ? new Date(email.receivedAt).toLocaleDateString()
              : "—";

            return (
              <tr
                key={email._id}
                className="border-t hover:bg-accent"
              >
                <td className="p-3 font-medium">
                  {email.company || "—"}
                </td>

                <td className="p-3">
                  {email.role || "—"}
                </td>

                <td className="p-3">
                  <StatusSelect email={{ ...email, status }} />
                </td>

                <td className="p-3 text-center">
                  {confidenceDisplay}
                </td>

                <td className="p-3 text-sm text-muted-foreground">
                  {receivedDisplay}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
