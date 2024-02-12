import configDotEnv from "./config";
import express, { json } from "express";
import notFound from "./middleware/not-found";
import connect from "./database/connections";
import { usersRouter } from "./routes/users";
import { errorHandler } from "./middleware/error-handler";
import morgan from "morgan";
import cors from "cors";
import { morganFormat } from "./logs-message/morgan";
import { userCallerRouter } from "./routes/user-caller";
import { userTDLRouter } from "./routes/user-TDL";
import { userInvitationRouter } from "./routes/user-invitation";
import { userMessageRouter } from "./routes/user-message";

configDotEnv();
connect();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(morganFormat));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/userCaller", userCallerRouter);
app.use("/api/v1/TDL", userTDLRouter);
app.use("/api/v1/invitation", userInvitationRouter);
app.use("/api/v1/messages", userMessageRouter);
app.use(errorHandler);
app.use(notFound);
app.listen(8080);
