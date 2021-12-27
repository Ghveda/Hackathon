import defaultImage from "./libs/utils/generateImageBase64.js";

export const image = defaultImage();
export const __prod__ = process.env.NODE_ENV === "production";
