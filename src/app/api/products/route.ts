import { NextResponse } from "next/server";
import products from "../../../../prisma/data/dummydata";  // ✅ default import

export async function GET() {
  return NextResponse.json(products);
}
