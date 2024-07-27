import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const patelians = await Patelian.find();
    return NextResponse.json({ patelians: patelians }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error encountered in fetch user API. ${error}` },
      { status: 500 }
    );
  }
}
