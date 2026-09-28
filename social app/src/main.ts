import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./modules/auth";
import userRouter from "./modules/user";
import postRouter from "./modules/post";
import commentRouter from "./modules/comment";
import friendRouter from "./modules/friend";
import { dbConnection } from "./DB/db.connection";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/friend", friendRouter);

app.use(globalErrorHandler);

app.listen(PORT, async () => {
    await dbConnection();
    console.log(`Server is running on port ${PORT}`);
});