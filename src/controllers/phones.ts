import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const phoneController = {
	// Crear un nuevo teléfono
	createPhone: async (req: Request, res: Response) => {
		try {
			const { documentId, phone, type, description, isActive } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const newPhone = await prisma.phones.create({
				data: {
					documentId: parseInt(documentId),
					phone,
					type,
					description,
					isActive: isActive !== undefined ? Boolean(isActive) : true,
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(newPhone);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener todos los teléfonos
	getAllPhones: async (_req: Request, res: Response) => {
		try {
			const phones = await prisma.phones.findMany();
			res.json(phones);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Obtener un teléfono por ID
	getPhoneById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const phone = await prisma.phones.findUnique({
				where: { id: parseInt(id) },
			});
			if (phone) {
				res.json(phone);
			} else {
				res.status(404).json({ message: "Teléfono no encontrado" });
			}
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Actualizar un teléfono
	updatePhone: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { phone, type, description, isActive } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const updatedPhone = await prisma.phones.update({
				where: { id: parseInt(id) },
				data: {
					phone,
					type,
					description,
					isActive: isActive !== undefined ? Boolean(isActive) : undefined,
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.json(updatedPhone);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Eliminar un teléfono
	deletePhone: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await prisma.phones.delete({
				where: { id: parseInt(id) },
			});
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
