import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const campaignController = {
	// Crear una nueva campaña
	createCampaign: async (req: Request, res: Response) => {
		try {
			const { operation, bank, campaign } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const id = parseInt(`${operation}${bank}`);
			const newCampaign = await prisma.campaign.create({
				data: {
					id,
					operation: parseInt(operation),
					bank: parseInt(bank),
					campaign,
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(newCampaign);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener todas las campañas
	getAllCampaigns: async (_req: Request, res: Response) => {
		try {
			const campaigns = await prisma.campaign.findMany();
			res.json(campaigns);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Obtener una campaña por ID
	getCampaignById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const campaign = await prisma.campaign.findUnique({
				where: { id: parseInt(id) },
			});
			if (campaign) {
				res.json(campaign);
			} else {
				res.status(404).json({ message: "Campaña no encontrada" });
			}
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Actualizar una campaña
	updateCampaign: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { campaign } = req.body;
			const updatedCampaign = await prisma.campaign.update({
				where: { id: parseInt(id) },
				data: {
					campaign,
					updatedAt: DateTime.now()
						.setZone("America/Bogota")
						.minus({ hours: 5 })
						.toJSDate(),
				},
			});
			res.json(updatedCampaign);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Eliminar una campaña
	deleteCampaign: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await prisma.campaign.delete({
				where: { id: parseInt(id) },
			});
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
