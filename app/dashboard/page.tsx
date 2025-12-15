import EmailTable from "@/components/EmailTable";
import axios from "axios";

async function getEmails() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/career-emails`);
  return res.data;
}

export default async function DashboardPage() {
  const { data } = await getEmails();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Career Dashboard
      </h1>

      <EmailTable emails={data} />
    </div>
  );
}
