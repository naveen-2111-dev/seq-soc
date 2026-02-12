import express, { type Express } from "express";
import login from "./route/login.js";
import register from "./route/register.js";
import post from "./route/post.js";
import comment from "./route/comment.js";

const app: Express = express();

app.use(express.json());

app.use("/api/auth", login);
app.use("/api/auth", register);
app.use("/api/posts", post);
app.use("/api/comments", comment);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);

  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    error: err.message || err,
  });
});

export default app;
