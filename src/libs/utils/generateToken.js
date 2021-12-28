import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });
};

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_TOKEN);
};

export { generateToken, decodeToken };
