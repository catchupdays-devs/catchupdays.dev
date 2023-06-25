import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/app/db";
import { ADMIN_USERNAMES } from "@/app/const";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);

  if (
    request.method === "POST" &&
    session &&
    ADMIN_USERNAMES.includes(session.user!.name!)
  ) {
    const body: { url: string; delete: boolean } = JSON.parse(request.body);

    if (body.delete) {
      await prisma.featured.delete({
        where: {
          url: body.url,
        },
      });
    } else {
      await prisma.featured.create({
        data: {
          url: body.url,
        },
      });
    }

    response.status(200).json({});
  } else {
    response.status(401).json({ error: "forbidden" });
  }
}
