import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const generalController = {
	// Crear un nuevo registro general
	createGeneral: async (req: Request, res: Response) => {
		try {
			const { operation, bank, state, substate, assignment } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const id = parseInt(`${operation}${bank}`);
			const newGeneral = await prisma.general.create({
				data: {
					id,
					operation: parseInt(operation),
					bank: parseInt(bank),
					state,
					substate,
					assignment,
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(newGeneral);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener todos los registros generales
	getAllGenerals: async (_req: Request, res: Response) => {
		try {
			const generals = await prisma.general.findMany();
			res.json(generals);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Obtener un registro general por ID
	getGeneralById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const general = await prisma.general.findUnique({
				where: { id: parseInt(id) },
			});
			if (general) {
				res.json(general);
			} else {
				res.status(404).json({ message: "Registro general no encontrado" });
			}
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Actualizar un registro general
	updateGeneral: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { state, substate, assignment } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const updatedGeneral = await prisma.general.update({
				where: { id: parseInt(id) },
				data: {
					state,
					substate,
					assignment,
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.json(updatedGeneral);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Eliminar un registro general
	deleteGeneral: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await prisma.general.delete({
				where: { id: parseInt(id) },
			});
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
