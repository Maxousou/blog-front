import express from "express";
import knex from "knex";
import config from "./src/config.js";
import usersRoute from "./src/routes/users.js";
import postsRoute from "./src/routes/posts.js";
import { Model } from "objection";
import cors from "cors";

const app = express();
const db = knex(config.db);

Model.knex(db);

app.use(
  cors({
    origin: process.env.WEB_APP_ORIGIN,
  })
);
app.use(express.json());

usersRoute({ app, db });
postsRoute({ app, db });

app.listen(config.port, () => console.log(`Listening on : ${config.port}`));
