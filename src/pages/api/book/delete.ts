/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function deleteBook(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if ((req.method = "DELETE")) {
    const { isbn } = req.body;
    const checkisbn = await db.books.findFirst({
      where: {
        isbn: isbn,
      },
    });
    if (checkisbn) {
      const book = await db.books.delete({
        where: {
          isbn: isbn?.toString(),
        },
      });
      return res.status(200).json({ message: "Book Deleted ", data: book });
    } else {
      return res.status(400).json({ message: "ISBN does not exist" });
    }
  } else {
    return res.status(404).json({ message: "Method Not Allowed" });
  }
}
