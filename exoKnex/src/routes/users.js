import * as yup from "yup";
import { emailValidator } from "../../validation.js";
import UserModel from "../db/models/Users.js";
import checkPayload from "../middlewares/checkPayload.js";
import checkQuery from "../middlewares/checkQuery.js";
import hashPassword from "../hashPassword.js";
import jsonwebtoken from "jsonwebtoken";
import config from "../config.js";
import auth from "../middlewares/auth.js";

const usersRoute = ({ app }) => {
  app.post("/sign-in", async (req, res) => {
    const {
      body: { email, password },
    } = req;

    const user = await UserModel.findValidUsersByEmail(email);

    if (!user) {
      res.status(401).send({ error: "invalid email or password" });

      return;
    }

    if (!user.checkPassword(password)) {
      res.status(401).send({ error: "invalid email or password" });

      return;
    }

    const jwt = jsonwebtoken.sign(
      {
        payload: { userId: user.id },
      },
      config.security.session.secret,
      { expiresIn: config.security.session.expiresIn }
    );

    res.send({ jwt });
  });

  app.post(
    "/sign-up",
    checkPayload({
      email: emailValidator.required(),
    }),
    async (req, res) => {
      const {
        body: { email, password },
      } = req;

      const [passwordHash, passwordSalt] = hashPassword(password);
      await UserModel.query().insertAndFetch({
        email,
        passwordHash,
        passwordSalt,
      });

      res.send({ status: "OK" });
    }
  );

  app.get(
    "/users",
    checkQuery({
      sortBy: yup.string().oneOf(["email", "id"]),
      order: yup.string().oneOf(["asc", "desc"]),
    }),
    async (req, res) => {
      const {
        query: { sortBy, order },
      } = req;

      const query = UserModel.query();
      if (sortBy && order) {
        query.orderBy(sortBy, order);
      }

      res.send(await query);
    }
  );

  app.get("/users/:userId", auth, async (req, res) => {
    const {
      params: { userId },
      session: { userId: sessionUserId },
    } = req;

    if (Number(userId) !== sessionUserId) {
      res.status(403).send({ error: "forbiden" });
      return;
    }

    const user = await UserModel.query().findById(userId);
    if (!user) {
      res.status(404).send({ error: "not found" });
    }
  });

  app.put(
    "/users/:userId",
    checkPayload({ email: emailValidator }),
    async (req, res) => {
      const {
        params: { userId },
        body: { email, password },
      } = req;

      const existingUser = await UserModel.query().findById(userId);

      if (!existingUser) {
        res.status(404).send({ error: "not found" });

        return;
      }

      const user = await existingUser
        .$query()
        .updateAndFetch({
          email,
          passwordHash: password,
          passwordSalt: password,
        })
        .returning("*");
      res.send(user);
    }
  );

  app.delete("/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req;

    const user = await UserModel.query().findById(userId);

    if (!user) {
      res.status(404).send({ error: "not found" });

      return;
    }

    await user.$query().delete();

    res.send(user);
  });
};

export default usersRoute;
