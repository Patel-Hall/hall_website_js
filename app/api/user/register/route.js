import { connectToMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Patelian from "@/models/patelian";

export async function POST(req) {
  try {
    const { name, email, instiEmail, rollNo, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToMongoDB();
    await Patelian.create({
      name,
      email,
      instiEmail,
      rollNo,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Patelian registered." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error encountered in register API. ${error}` },
      { status: 500 }
    );
  }
}
