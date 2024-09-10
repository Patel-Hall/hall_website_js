import { connectToMongoDB } from "@/lib/mongodb";
import Hall from "@/models/hall";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { field, value } = await req.json();
    if (!field || !value) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    await connectToMongoDB();
    const updatedHallInfo = await Hall.findOneAndUpdate(
      {},
      {
        $set: { [field]: value },
      },
      { new: true }
    );

    return NextResponse.json({ updatedHallInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error:", error },
      { status: 500 }
    );
  }
}
