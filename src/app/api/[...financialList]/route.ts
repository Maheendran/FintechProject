import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongoose";
import Financial from "@/lib/models/financial.model";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await clientPromise();
  
    const searchParams = req.nextUrl.searchParams;
    const perPage = searchParams.get("perPage");
    const page = searchParams.get("page");

    const pageNumber = parseInt(page as string);
    const itemsPerPage = parseInt(perPage as string);
    const startIndex = (pageNumber - 1) * itemsPerPage;
const totalLength= await Financial.countDocuments()
    const data = await Financial.find(
      {},
      {
        updatedAt: 0,
        createdAt: 0,
        __v: 0,
      }
    )
      .skip(startIndex)
      .limit(itemsPerPage);

    return NextResponse.json(
      { message: "date fetched successfully",totalLength ,data: data, status: "success" },
      { status: 200 }
    );
    // const pageNumber = parseInt(page as string);
    // const itemsPerPage = parseInt(perPage as string);
    // const startIndex = (pageNumber - 1) * itemsPerPage;
  } catch (error) {
    console.error(error);
    return NextResponse.json("Server error");
  }
}
