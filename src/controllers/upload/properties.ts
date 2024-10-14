import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const propertiesController = {
	uploadProperties: async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				res.status(400).json({ message: "No se ha subido ningún archivo" });
				return;
			}

			const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const data = XLSX.utils.sheet_to_json(sheet);

			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });

			const properties = await Promise.all(
				data.map(async (row: any) => {
					// Verificar que los campos requeridos estén presentes
					if (!row.documentId || !row.property || !row.enrollment || !row.registration || !row.city || !row.direction || !row.detail || !row.assignment) {
						throw new Error(
							`Datos incompletos en la fila: ${JSON.stringify(row)}`,
						);
					}

					try {
						return await prisma.properties.create({
							data: {
								documentId: parseInt(row.documentId),
								property: String(row.property),
								enrollment: String(row.enrollment),
								registration: String(row.registration),
								city: String(row.city),
								direction: String(row.direction),
								detail: String(row.detail),
								assignment: String(row.assignment),
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
				message: `${properties.length} propiedades importadas con éxito`,
			});
		} catch (error) {
			console.error("Error al importar propiedades:", error);
			res.status(400).json({ error: (error as Error).message });
		}
	},
};