"use client";

import StatusSelect from "./StatusSelect";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EmailTableProps {
  emails: {
    _id: string;
    company?: string;
    role?: string;
    status?: string;
    receivedAt?: string;
  }[];
}

export default function EmailTable({ emails }: EmailTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of your job application emails.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Received</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map((email) => {
            const status = email.status ?? "APPLIED";
            const receivedDisplay = email.receivedAt
              ? new Date(email.receivedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "—";

            return (
              <TableRow key={email._id}>
                <TableCell className="font-medium">
                  {email.company || "—"}
                </TableCell>
                <TableCell>{email.role || "—"}</TableCell>
                <TableCell>
                  {/* <StatusSelect email={{ ...email, status }} /> */}
                  {status}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {receivedDisplay}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
