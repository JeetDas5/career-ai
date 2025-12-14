import { connectDB } from "@/lib/db";
import CareerEmail from "@/models/CareerEmail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const email = await CareerEmail.findById(params.id);

    if (!email) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: email });
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching career email:", error.message);
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const updates = await req.json();

    const email = await CareerEmail.findByIdAndUpdate(params.id, updates, {
      new: true,
    });

    return NextResponse.json({ success: true, data: email });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await CareerEmail.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error deleting career email:", error.message);
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
