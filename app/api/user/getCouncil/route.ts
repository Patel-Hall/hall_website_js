import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { NextRequest, NextResponse } from "next/server";

interface CouncilMember {
  name: string;
  post: string;
  imgUrl: string;
  facebookProfile: string;
  linkedinProfile: string;
}

export async function POST(req: NextRequest) {
  try {
    const { session } = await req.json();
    await connectToMongoDB();
    const patelians = await Patelian.find();
    const council = <CouncilMember[]>[];
    patelians.filter((patelian: any, index) => {
      if (patelian.posts.length !== 0) {
        {
          patelian.posts.map((post: any) => {
            if (post.session === session) {
              const newPost = `${post.post} ${post.portfolio}`;
              const newMember: CouncilMember = {
                name: patelian.name,
                post: newPost,
                imgUrl: patelian.profileImageUrl,
                facebookProfile: patelian.facebookProfile,
                linkedinProfile: patelian.linkedinProfile,
              };

              council.push(newMember);
            }
          });
        }
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
