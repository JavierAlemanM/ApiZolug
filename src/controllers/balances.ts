import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const balanceController = {
	// Crear un nuevo balance
	createBalance: async (req: Request, res: Response) => {
		try {
			const { operation, bank, capital, total } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const id = parseInt(`${operation}${bank}`);
			const newBalance = await prisma.balance.create({
				data: {
					id,
					operation: parseInt(operation),
					bank: parseInt(bank),
					capital: parseFloat(capital),
					total: parseFloat(total),
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(newBalance);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener todos los balances
	getAllBalances: async (_req: Request, res: Response) => {
		try {
			const balances = await prisma.balance.findMany();
			res.json(balances);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Obtener un balance por ID
	getBalanceById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const balance = await prisma.balance.findUnique({
				where: { id: parseInt(id) },
			});
			if (balance) {
				res.json(balance);
			} else {
				res.status(404).json({ message: "Balance no encontrado" });
			}
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Actualizar un balance
	updateBalance: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { capital, total } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const updatedBalance = await prisma.balance.update({
				where: { id: parseInt(id) },
				data: {
					capital: parseFloat(capital),
					total: parseFloat(total),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.json(updatedBalance);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Eliminar un balance
	deleteBalance: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await prisma.balance.delete({
				where: { id: parseInt(id) },
			});
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
