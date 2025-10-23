const jwt = require("jsonwebtoken");
const JWT_SECRET = 'Gqptfkenm4MhEoG7hzZEDSvkrt643543xWcQ2mbR4532534gbcbcgbcgbU34635ggbgffg463456QeTh';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // ممكن تستخدمه بعد كده
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
