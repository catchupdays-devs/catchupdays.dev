import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.resolve("./", "src/app/images/banner3-min.png");
const imageBuffer = fs.readFileSync(filePath);

export default function Image(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "image/jpg");
  res.send(imageBuffer);
}
