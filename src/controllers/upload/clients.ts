import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const clientController = {
	uploadClients: async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				res.status(400).json({ message: "No se ha subido ningún archivo" });
				return;
			}

			const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const data = XLSX.utils.sheet_to_json(sheet);

			const clients = await Promise.all(
				data.map(async (row: any) => {
					// Verificar que los campos requeridos estén presentes
					if (!row.identificationId || !row.name) {
						throw new Error(
							`Datos incompletos en la fila: ${JSON.stringify(row)}`,
						);
					}

					let colombiaTime = DateTime.now().setZone("America/Bogota");
					colombiaTime = colombiaTime.minus({ hours: 5 });

					try {
						return await prisma.clients.upsert({
							where: { identificationId: String(row.identificationId) },
							update: {
								name: String(row.name),
								updatedAt: colombiaTime.toJSDate(),
							},
							create: {
								identificationId: String(row.identificationId),
								name: String(row.name),
								isActive:
									row.isActive !== undefined
										? Boolean(row.isActive)
										: true,
								createdAt: colombiaTime.toJSDate(),
								updatedAt: colombiaTime.toJSDate(),
							},
						});
					} catch (error: any) {
						throw error;
					}
				}),
			);

			res.status(201).json({
				message: `${clients.length} clientes importados con éxito`,
			});
		} catch (error) {
			console.error("Error al importar clientes:", error);
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
