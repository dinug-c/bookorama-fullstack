/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function getListBook(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if ((req.method = "GET")) {
    const books = await db.books.findMany({
      select: {
        isbn: true,
        category: true,
        title: true,
        author: true,
        price: true,
        stock: true,
      },
    });
    return res.status(200).json(books);
  } else {
    return res.status(404).json({ message: "Method Not Allowed" });
  }
}
