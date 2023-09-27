import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const token = req.header("Authorization");
  const jwttoken = token.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const decodedToken = jwt.verify(jwttoken, "your-secret-key");
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
}

export default authenticate;
