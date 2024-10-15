import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const phoneController = {
	uploadPhones: async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				res.status(400).json({ message: "No se ha subido ningún archivo" });
				return;
			}

			const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const data = XLSX.utils.sheet_to_json(sheet);

			const phones = await Promise.all(
				data.map(async (row: any) => {
					// Verificar que los campos requeridos estén presentes
					if (
						!row.documentId ||
						!row.phone ||
						!row.type ||
						!row.description
					) {
						throw new Error(
							`Datos incompletos en la fila: ${JSON.stringify(row)}`,
						);
					}

					let colombiaTime = DateTime.now().setZone("America/Bogota");
					colombiaTime = colombiaTime.minus({ hours: 5 });

					try {
						// Buscar si ya existe un teléfono con el mismo documentId y número
						const existingPhone = await prisma.phones.findFirst({
							where: {
								documentId: parseInt(row.documentId),
								phone: String(row.phone),
							},
						});

						if (existingPhone) {
							// Si existe, actualizamos
							return await prisma.phones.update({
								where: { id: existingPhone.id },
								data: {
									type: String(row.type),
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
							return await prisma.phones.create({
								data: {
									documentId: parseInt(row.documentId),
									phone: String(row.phone),
									type: String(row.type),
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
				message: `${phones.length} teléfonos importados con éxito`,
			});
		} catch (error) {
			console.error("Error al importar teléfonos:", error);
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
