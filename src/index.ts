import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/users";
import clientRoutes from "./routes/clients";
import authRoutes from "./routes/auth";
import uploadClients from "./routes/upload/clients";
import uploadAssignments from "./routes/upload/assignment";
import uploadWallets from "./routes/upload/wallet";
import uploadPayments from "./routes/upload/payment";
import uploadManagements from "./routes/upload/management";
import uploadEps from "./routes/upload/eps";
import uploadProperties from "./routes/upload/properties";
import uploadEmployments from "./routes/upload/employment";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", clientRoutes);
app.use("/api", authRoutes);
app.use("/api", uploadClients);
app.use("/api", uploadAssignments);
app.use("/api", uploadWallets);
app.use("/api", uploadPayments);
app.use("/api", uploadManagements);
app.use("/api", uploadEps);
app.use("/api", uploadProperties);
app.use("/api", uploadEmployments);
app.get("/", (req: Request, res: Response) => {
	res.send("¡Bienvenido a la API zolug!");
});

app.listen(port, () => {
	console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`);
});
