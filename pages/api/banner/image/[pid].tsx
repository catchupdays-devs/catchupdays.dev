import fs from "fs";
import path from "path";

const filePath = path.resolve("./", "src/app/images/banner.png");
const imageBuffer = fs.readFileSync(filePath);

export default function Image(req, res) {
  res.setHeader("Content-Type", "image/jpg");
  res.send(imageBuffer);
}
