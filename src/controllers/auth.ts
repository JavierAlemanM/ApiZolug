import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authController = {
	login: async (req: Request, res: Response) => {
		try {
			const { documentId, password } = req.body;
			const user = await prisma.users.findUnique({
				where: { documentId: parseInt(documentId) },
			});

			if (!user) {
				res.status(401).json({ message: 'Credenciales inválidas' });
				return;
			}
			
			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
			  res.status(401).json({ message: 'Credenciales inválidas' });
			  return;
			}

			const { password: _, ...userWithoutPassword } = user;
			res.json({ message: 'Login exitoso', user: userWithoutPassword });
	 
		} catch (error) {
			res.status(500).json({ error: (error as Error).message });
		}
	},
};