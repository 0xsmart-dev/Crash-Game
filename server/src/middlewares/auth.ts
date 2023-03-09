import jwt from "jsonwebtoken";
import environment from "configs";
const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" }); // Error if no token is found
  }

  try {
    const decoded = jwt.verify(token, environment.secretKey);
    req.user = decoded;
    next();
  } catch (e: any) {
    console.log(e.message);
    res.status(401).json({ msg: "Token is not valid " }); // Error for invalid token
  }
};
export default authMiddleware;
