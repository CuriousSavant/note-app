import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || "";

    const data = await prisma.notes.findMany({
      where: {
        title: {
          contains: search.toLowerCase(),
        },
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        msg: "Error fetch data from database: ",
        err,
      },
      { status: 404 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, content, tags, createAt, pin } = await req.json();
    const data = await prisma.notes.create({
      data: {
        title: title,
        content: content,
        tags: tags,
        createAt: createAt,
        pin: pin,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.log("error createing: ", err);
    return NextResponse.json(err);
  }
};
