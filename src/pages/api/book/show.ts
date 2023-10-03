/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function detailBook(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if ((req.method = "GET")) {
    const isbn = req.query.id?.toString();

    const checkisbn = await db.books.findUnique({
      where: {
        isbn: isbn,
      },
    });
    if (checkisbn) {
      const book = await db.books.findUnique({
        where: {
          isbn: isbn,
        },
        include: {
          category: true,
        },
      });
      return res.status(200).json({ message: "Book Detail ", data: book });
    } else {
      return res.status(400).json({ message: "ISBN does not exist" });
    }
  } else {
    return res.status(404).json({ message: "Method Not Allowed" });
  }
}
