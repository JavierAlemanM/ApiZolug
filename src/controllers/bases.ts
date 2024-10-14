import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const baseController = {
	// Crear una nueva base
	createBase: async (req: Request, res: Response) => {
		try {
			const {
				operation,
				bank,
				account,
				expiration,
				disburse,
				office,
				dependence,
				isActive,
			} = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const id = parseInt(`${operation}${bank}`);
			const newBase = await prisma.base.create({
				data: {
					id,
					operation: parseInt(operation),
					bank: parseInt(bank),
					account: parseInt(account),
					expiration,
					disburse: parseFloat(disburse),
					office,
					dependence,
					isActive: isActive !== undefined ? Boolean(isActive) : true,
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(newBase);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener todas las bases
	getAllBases: async (_req: Request, res: Response) => {
		try {
			const bases = await prisma.base.findMany();
			res.json(bases);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Obtener una base por ID
	getBaseById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const base = await prisma.base.findUnique({
				where: { id: parseInt(id) },
			});
			if (base) {
				res.json(base);
			} else {
				res.status(404).json({ message: "Base no encontrada" });
			}
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Actualizar una base
	updateBase: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { account, expiration, disburse, office, dependence, isActive } =
				req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const updatedBase = await prisma.base.update({
				where: { id: parseInt(id) },
				data: {
					account: account ? parseInt(account) : undefined,
					expiration,
					disburse: disburse ? parseFloat(disburse) : undefined,
					office,
					dependence,
					isActive: isActive !== undefined ? Boolean(isActive) : undefined,
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.json(updatedBase);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Eliminar una base
	deleteBase: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await prisma.base.delete({
				where: { id: parseInt(id) },
			});
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
