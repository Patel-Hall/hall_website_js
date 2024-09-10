import { connectToMongoDB } from "@/lib/mongodb";
import Hall from "@/models/hall";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToMongoDB();
        const hallInfo = await Hall.findOne({});
        return NextResponse.json({ hallInfo });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }
}
