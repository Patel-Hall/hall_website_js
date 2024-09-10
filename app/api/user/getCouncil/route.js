import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { session } = await req.json();
    await connectToMongoDB();
    const patelians = await Patelian.find();
    const council = [];
    patelians.filter((patelian, index) => {
      if (patelian.posts.length !== 0) {
        patelian.posts.map((post) => {
          if (post.session === session) {
            const newPost = `${post.post} ${post.portfolio}`;
            const newMember = {
              name: patelian.name,
              post: post.post,
              portfolio: post.portfolio,
              imgUrl: patelian.profileImageUrl,
              facebookProfile: patelian.facebookProfile,
              linkedinProfile: patelian.linkedinProfile,
            };

            council.push(newMember);
          }
        });
      }
    });
    return NextResponse.json({ council: council }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error encountered in fetch user API. ${error}` },
      { status: 500 }
    );
  }
}

