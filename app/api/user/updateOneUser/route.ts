import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("session");
    if (!session || !session?.user || session?.user?.role !== "Admin") {
      return NextResponse.json(
        { message: "Unauthorised. Admin Only!" },
        { status: 405 }
      );
    }
    console.log("check 405");

    const { id, field, value } = await req.json();
    console.log(id);
    console.log(field);
    console.log(value);
    if (!field || !value) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }
    console.log("check 400");

    await connectToMongoDB();
    console.log("connect mongodb");
    const updatedPatelian = await Patelian.findById(id);
    console.log(updatedPatelian[field]);

    updatedPatelian[field] = value;
    console.log("updated field");
    await updatedPatelian.save();
    console.log("updated save");

    return NextResponse.json({ updatedPatelian }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
