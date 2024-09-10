import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToMongoDB();
    const { patelians } = await req.json();
    for (const patelian of patelians) {
      const updatedPatelian = { $set: patelian };
      await Patelian.updateOne({ _id: patelian._id }, updatedPatelian);
    }

    return NextResponse.json({ message: "Updated Users!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error:", error },
      { status: 500 }
    );
  }
}
