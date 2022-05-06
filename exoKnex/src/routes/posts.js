import PostModel from "../db/models/Post.js";

const postsRoute = ({ app }) => {
  app.post("/posts", async (req, res) => {
    const {
      body: { title, content, userId },
    } = req;

    try {
      const post = await PostModel.query().insertAndFetch({
        title,
        content,
        userId,
      });

      res.send(post);
    } catch (err) {
      res.status(500).send({ error: "oops" });
    }
  });

  app.get("/posts", async (req, res) => {
    const {
      query: { userId },
    } = req;

    const query = PostModel.query().withGraphFetched("author");

    if (userId) {
      query.where({ userId });
    }

    res.send(await query);
  });
};

export default postsRoute;
