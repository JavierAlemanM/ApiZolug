import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const emailController = {
	uploadEmails: async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				res.status(400).json({ message: "No se ha subido ningún archivo" });
				return;
			}

			const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const data = XLSX.utils.sheet_to_json(sheet);

			const emails = await Promise.all(
				data.map(async (row: any) => {
					// Verificar que los campos requeridos estén presentes
					if (!row.documentId || !row.email || !row.description) {
						throw new Error(
							`Datos incompletos en la fila: ${JSON.stringify(row)}`,
						);
					}

					let colombiaTime = DateTime.now().setZone("America/Bogota");
					colombiaTime = colombiaTime.minus({ hours: 5 });

					try {
						// Buscar si ya existe un email con el mismo documentId y email
						const existingEmail = await prisma.emails.findFirst({
							where: {
								documentId: parseInt(row.documentId),
								email: String(row.email),
							},
						});

						if (existingEmail) {
							// Si existe, actualizamos
							return await prisma.emails.update({
								where: { id: existingEmail.id },
								data: {
									description: String(row.description),
									isActive:
										row.isActive !== undefined
											? Boolean(row.isActive)
											: true,
									updatedAt: colombiaTime.toJSDate(),
								},
							});
						} else {
							// Si no existe, creamos uno nuevo
							return await prisma.emails.create({
								data: {
									documentId: parseInt(row.documentId),
									email: String(row.email),
									description: String(row.description),
									isActive:
										row.isActive !== undefined
											? Boolean(row.isActive)
											: true,
									createdAt: colombiaTime.toJSDate(),
									updatedAt: colombiaTime.toJSDate(),
								},
							});
						}
					} catch (error: any) {
						throw error;
					}
				}),
			);

			res.status(201).json({
				message: `${emails.length} emails importados con éxito`,
			});
		} catch (error) {
			console.error("Error al importar emails:", error);
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
