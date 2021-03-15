const jwt = require("jsonwebtoken");
const User = require("../modules/user/model/UserModel");

const authMiddleware = async (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;

  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!user) throw new Error();

      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({
        error: "Authentication error. Token required.",
        status: 401,
      });
    }
  } else {
    res.status(403).send({
      error: "Not authorized",
      status: 403,
    });
  }
};

module.exports = authMiddleware;
