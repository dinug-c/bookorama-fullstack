/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function addBook(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if ((req.method = "POST")) {
    const { isbn, categoryId, title, author, price, stock } = req.body;
    const checkisbn = await db.books.findUnique({
      where: {
        isbn: isbn,
      },
    });
    if (checkisbn) {
      return res.status(400).json({ message: "ISBN already exist" });
    } else {
      const book = await db.books.create({
        data: {
          author: author,
          title: title,
          price: Number.parseInt(price as string),
          stock: Number.parseInt(stock as string),
          isbn: isbn,
          categoryId: Number.parseInt(categoryId as string),
        },
      });
      return res.status(200).json({ message: "Book Added ", data: book });
    }
  } else {
    return res.status(404).json({ message: "Method Not Allowed" });
  }
}
