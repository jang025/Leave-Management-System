const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // look for authorization header
    const authHeader = req.get("Authorization");
    // if there is no header
    if (!authHeader) {
      res.status(401).json({ msg: "no token provided" });
      return;
    }

    // extract token
    const token = authHeader.split(" ")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // makes user data accessible
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ msg: "invalid token", error });
    return;
  }
};

module.exports = { auth };
