import jwt from "jsonwebtoken";
import config from "config";

function generateToken(payload) {
  let privateKey = config.get("PRIVATE_KEY");
  const token = jwt.sign(payload, privateKey, { expiresIn: "3d" });
  return token;
}

export default generateToken;

//header ,payload,signature =>combined makes jwt respectively
