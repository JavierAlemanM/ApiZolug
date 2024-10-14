import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const walletController = {
	//Crear una nueva wallet
	createWallet: async (req: Request, res: Response) => {
		try {
			const { operation, bank, wallet } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			let id = operation.toString() + bank.toString();
			const wallets = await prisma.wallet.create({
				data: {
					id,
					operation,
					bank,
					wallet,
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(wallets);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	//Obtener todas las wallets
	getAllWallets: async (req: Request, res: Response) => {
		try {
			const wallets = await prisma.wallet.findMany();
			res.status(200).json(wallets);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}, 

	//Obtener una wallet por su id
	getWalletById: async (req: Request, res: Response) => {
		try {
			const { operation, bank } = req.params;
			let id = parseInt(operation.toString() + bank.toString());
			const wallet = await prisma.wallet.findUnique({
				where: { id: id },
			});
			res.status(200).json(wallet);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	//Actualizar una wallet por su id
	updateWallet: async (req: Request, res: Response) => {
		try {
			const { operation, bank, wallet } = req.body;
			let id = parseInt(operation.toString() + bank.toString());
			const wallets = await prisma.wallet.update({
				where: { id: id },
				data: {
               operation: parseInt(operation),
               bank: parseInt(bank),
					wallet,
					updatedAt: DateTime.now().toJSDate(),
				},
			});
			res.status(200).json(wallets);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}, 

	//Eliminar una wallet por su id
	deleteWallet: async (req: Request, res: Response) => {
		try {
			const { operation, bank } = req.params;
			let id = parseInt(operation.toString() + bank.toString());
			await prisma.wallet.delete({
				where: { id: id },
			});
			res.status(200).json({ message: "Wallet eliminada correctamente" });
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
