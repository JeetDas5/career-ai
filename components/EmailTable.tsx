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
    senderName?: string;
    senderEmail?: string;
    interview?: string;
    company?: string;
    role?: string;
    status?: string;
    receivedAt?: string;
  }[];
}

const normaliseDateAndTime = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

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
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map((email) => {
            const status = email.status ?? "APPLIED";
            const receivedDisplay = email.receivedAt
              ? normaliseDateAndTime(email.receivedAt)
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
                <TableCell className="text-right">
                  {email.interview ? (
                    <span className="text-muted-foreground">
                      {normaliseDateAndTime(email.interview)}
                    </span>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
