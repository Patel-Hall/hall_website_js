import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { id, field, value } = await req.json();
    if (!field || !value) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    await connectToMongoDB();
    const updatedPatelian = await Patelian.findOneAndUpdate(
      { id },
      {
        $set: { [field]: value },
      },
      { new: true }
    );

    return NextResponse.json({ updatedPatelian }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error:", error },
      { status: 500 }
    );
  }
}
