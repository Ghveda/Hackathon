import fs from "fs";

const main = () => {
  const file = fs.readFileSync("src/assets/images/image.jpg", {
    encoding: "base64",
  });
  fs.writeFileSync("image.txt", file);
  return [file];
};

export default main;
