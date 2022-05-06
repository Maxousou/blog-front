import jsonwebtoken from "jsonwebtoken";
import config from "../config.js ";

const auth = (req, res, next) => {
  const {
    headers: { authentication: jwt },
  } = req;

  try {
    const { payload } = jsonwebtoken.verify(
      jwt,
      config.security.session.secret
    );

    req.session = payload;

    next();
  } catch (err) {
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      res.status(403).send({ error: "forbiden" });
      return;
    }
    res.status(500).send({ error: "oops, try again" });
  }
};

export default auth;
