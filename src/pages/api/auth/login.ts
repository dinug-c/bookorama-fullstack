/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { verifyPassword } from "~/utils/hash";

interface LoginData {
  email: string;
  password: string;
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if ((req.method = "POST")) {
    const { email, password }: LoginData = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    } else {
      const emailCheck = await db.admin.findUnique({
        where: {
          email,
        },
      });
      if (!emailCheck) {
        return res.status(401).json({ message: "Email not found" });
      }
      const isTruePassword = await verifyPassword(
        password,
        emailCheck.password,
      );
      if (!isTruePassword) {
        return res.status(401).json({ message: "Password incorrect" });
      }
      return res.status(200).json({
        message: "Login successful",
        data: {
          email: emailCheck.email,
          name: emailCheck.name,
          id: emailCheck.id,
        },
      });
    }
  } else {
    return res.status(404).json({ message: "Method Not Allowed" });
  }
}
