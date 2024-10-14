import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const decilController = {
	// Crear un nuevo decil
	createDecil: async (req: Request, res: Response) => {
		try {
			const { operation, bank, decil } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const id = parseInt(`${operation}${bank}`);
			const newDecil = await prisma.decil.create({
				data: {
					id,
					operation: parseInt(operation),
					bank: parseInt(bank),
					decil: parseInt(decil),
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(newDecil);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener todos los deciles
	getAllDecils: async (_req: Request, res: Response) => {
		try {
			const decils = await prisma.decil.findMany();
			res.json(decils);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Obtener un decil por ID
	getDecilById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const decil = await prisma.decil.findUnique({
				where: { id: parseInt(id) },
			});
			if (decil) {
				res.json(decil);
			} else {
				res.status(404).json({ message: "Decil no encontrado" });
			}
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Actualizar un decil
	updateDecil: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { decil } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const updatedDecil = await prisma.decil.update({
				where: { id: parseInt(id) },
				data: {
					decil: parseInt(decil),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.json(updatedDecil);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Eliminar un decil
	deleteDecil: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await prisma.decil.delete({
				where: { id: parseInt(id) },
			});
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
