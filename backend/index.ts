import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRouter } from "./routes/auth.router";

const app = new Hono();

app.use(logger());

app.route("/auth", authRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: process.env.PORT || 8000,
  fetch: app.fetch,
};
