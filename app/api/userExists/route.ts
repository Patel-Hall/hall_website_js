import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const { email } = await req.json();
    const patelian = await Patelian.findOne({ email }).select("_id");
    return NextResponse.json({ patelian });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
