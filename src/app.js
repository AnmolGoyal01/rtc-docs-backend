import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

// routes import
import userRouter from "./routes/user.router.js";
import documentRouter from "./routes/document.router.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/documents", documentRouter);

app.use(errorHandler);

export { app };
