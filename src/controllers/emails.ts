import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const emailController = {
	// Crear un nuevo email
	createEmail: async (req: Request, res: Response) => {
		try {
			const { documentId, email, description, isActive } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const newEmail = await prisma.emails.create({
				data: {
					documentId: parseInt(documentId),
					email,
					description,
					isActive: isActive !== undefined ? Boolean(isActive) : true,
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(newEmail);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener todos los emails
	getAllEmails: async (_req: Request, res: Response) => {
		try {
			const emails = await prisma.emails.findMany();
			res.json(emails);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Obtener un email por ID
	getEmailById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const email = await prisma.emails.findUnique({
				where: { id: parseInt(id) },
			});
			if (email) {
				res.json(email);
			} else {
				res.status(404).json({ message: "Email no encontrado" });
			}
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	// Actualizar un email
	updateEmail: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { email, description, isActive } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const updatedEmail = await prisma.emails.update({
				where: { id: parseInt(id) },
				data: {
					email,
					description,
					isActive: isActive !== undefined ? Boolean(isActive) : undefined,
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.json(updatedEmail);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Eliminar un email
	deleteEmail: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await prisma.emails.delete({
				where: { id: parseInt(id) },
			});
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
