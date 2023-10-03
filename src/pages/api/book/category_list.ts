/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function getListCategory(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if ((req.method = "GET")) {
    const categories = await db.category.findMany();
    return res.status(200).json({ message: "List Category", data: categories });
  } else {
    return res.status(404).json({ message: "Method Not Allowed" });
  }
}
