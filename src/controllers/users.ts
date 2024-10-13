import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const userController = {
	createUser: async (req: Request, res: Response) => {
		try {
			const { documentId, names, email, phone, password, roles } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await prisma.users.create({
				data: {
					documentId: parseInt(documentId),
					names,
					email,
					phone,
					password: hashedPassword,
					roles: roles as string[],
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			const { password: _, ...userWithoutPassword } = user;
			res.status(201).json(userWithoutPassword);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	getAllUsers: async (_req: Request, res: Response) => {
		try {
			const users = await prisma.users.findMany({
				select: {
					documentId: true,
					names: true,
					email: true,
					phone: true,
					roles: true,
					isActive: true,
					createdAt: true,
					updatedAt: true,
				},
			});
			res.json(users);
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	getUserById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const user = await prisma.users.findUnique({
				where: { documentId: parseInt(id) },
				select: {
					documentId: true,
					names: true,
					email: true,
					phone: true,
					roles: true,
					isActive: true,
					createdAt: true,
					updatedAt: true,
				},
			});
			if (user) {
				res.json(user);
			} else {
				res.status(404).json({ message: "Usuario no encontrado" });
			}
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},

	updateUser: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { names, email, phone, password, roles, isActive } = req.body;
			let updateData: any = { names, email, phone, roles, isActive };
			if (password) {
				updateData.password = await bcrypt.hash(password, 10);
			}
			const updatedUser = await prisma.users.update({
				where: { documentId: parseInt(id) },
				data: updateData,
				select: {
					documentId: true,
					names: true,
					email: true,
					phone: true,
					roles: true,
					isActive: true,
					createdAt: true,
					updatedAt: true,
				},
			});
			res.json(updatedUser);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await prisma.users.delete({
				where: { documentId: parseInt(id) },
			});
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
