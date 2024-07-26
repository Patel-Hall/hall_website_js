import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user || session?.user?.role !== "Admin") {
      return NextResponse.json(
        { message: "Unauthorised. Admin Only!" },
        { status: 405 }
      );
    }

    const { id, field, value } = await req.json();
    if (!field || !value) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    await connectToMongoDB();
    const updatedPatelian = await Patelian.findById(id);

    updatedPatelian[field] = value;
    await updatedPatelian.save();

    return NextResponse.json({ updatedPatelian }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error:", error },
      { status: 500 }
    );
  }
}
