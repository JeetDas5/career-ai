import { connectDB } from "@/lib/db";
import CareerEmail from "@/models/CareerEmail";
import { NextRequest, NextResponse } from "next/server";

interface Filter {
  category?: string | null;
  status?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const email = await CareerEmail.create(data);

    return NextResponse.json({ success: true, data: email }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error creating career email:", error.message);
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const filter: Filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const emails = await CareerEmail.find(filter)
      .sort({ receivedAt: -1 })
      .limit(100);


    return NextResponse.json({ success: true, data: emails });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching career emails:", error.message);
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
