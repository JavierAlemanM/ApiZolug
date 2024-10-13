import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const clientController = {
	// Crear un nuevo cliente
	createClient: async (req: Request, res: Response) => {
		try {
			const { documentId, name, isActive } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const client = await prisma.clients.create({
				data: {
					documentId: parseInt(documentId),
					name,
					isActive: isActive !== undefined ? isActive : true,
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(client);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener todos los clientes
	getAllClients: async (_req: Request, res: Response) => {
		try {
			const clients = await prisma.clients.findMany();
			res.json(clients);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Obtener un cliente por ID
	getClientById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const client = await prisma.clients.findUnique({
				where: { documentId: parseInt(id) },
			});
			if (client) {
				res.json(client);
			} else {
				res.status(404).json({ message: "Cliente no encontrado" });
			}
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Actualizar un cliente
	updateClient: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { name, isActive } = req.body;
			const updatedClient = await prisma.clients.update({
				where: { documentId: parseInt(id) },
				data: {
					name,
					isActive: isActive !== undefined ? isActive : undefined,
				},
			});
			res.json(updatedClient);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Eliminar un cliente
	deleteClient: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await prisma.clients.delete({
				where: { documentId: parseInt(id) },
			});
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
