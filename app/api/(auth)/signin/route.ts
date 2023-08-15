import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { comparePasswords, createJWT } from "@/libs/auth";
import { db } from "@/libs/db";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401);
      res.json({ error: "Invalid login" });
      return;
    }

    const isUser = await comparePasswords(req.body.password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(201);
      res.json({});
    } else {
      res.status(401);
      res.json({ error: "Invalid login" });
    }
  } else {
    res.status(402);
    res.json({});
  }
}
