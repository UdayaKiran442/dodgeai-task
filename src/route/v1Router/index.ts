import { Hono } from "hono";
import messageRouter from "./message.route";

const v1Router = new Hono();

v1Router.route('/message', messageRouter);

export default v1Router;