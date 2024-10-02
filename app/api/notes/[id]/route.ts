import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const editId = parseInt(params.id);
    const { title, content, tags, createAt, pin } = await req.json();
    const data = await prisma.notes.update({
      data: {
        title,
        content,
        tags,
        createAt,
        pin: pin,
      },
      where: { id: editId },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.log("error updateding: ", err);
    return NextResponse.json(err);
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const delId = parseInt(params.id);
    const data = await prisma.notes.delete({ where: { id: delId } });
    return NextResponse.json(data);
  } catch (err) {
    console.log("error updateding: ", err);
    return NextResponse.json(err);
  }
};
