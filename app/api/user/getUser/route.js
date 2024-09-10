import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectToMongoDB();
    const patelian = await Patelian.findOne({ email });
    return NextResponse.json({ patelian: patelian }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error encountered in fetch user API. ${error}` },
      { status: 500 }
    );
  }
}
