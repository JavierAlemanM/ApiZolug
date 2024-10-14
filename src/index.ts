import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/users";
import clientRoutes from "./routes/clients";
import authRoutes from "./routes/auth";
import uploadClients from "./routes/upload/clients";
import campaignRoutes from "./routes/campaign";
import uploadCampaigns from "./routes/upload/campaign";
import generalRoutes from "./routes/generals";
import uploadGenerals from "./routes/upload/generals";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", clientRoutes);
app.use("/api", campaignRoutes);
app.use("/api", generalRoutes);
app.use("/api", authRoutes);
app.use("/api", uploadClients);
app.use("/api", uploadCampaigns);
app.use("/api", uploadGenerals);
app.get("/", (req: Request, res: Response) => {
	res.send("¡Bienvenido a la API zolug!");
});

app.listen(port, () => {
	console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`);
});
