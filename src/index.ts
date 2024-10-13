import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/users";
import clientRoutes from "./routes/clients";
import authRoutes from "./routes/auth";
import uploadClients from "./routes/upload/clients";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", clientRoutes);
app.use("/api", authRoutes);
app.use("/api", uploadClients);
app.get("/", (req: Request, res: Response) => {
	res.send("¡Bienvenido a la API zolug!");
});

app.listen(port, () => {
	console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`);
});
