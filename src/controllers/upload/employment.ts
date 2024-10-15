import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const employmentController = {
	uploadEmployments: async (req: Request, res: Response) => {
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

			const employments = await Promise.all(
				data.map(async (row: any) => {
					// Verificar que los campos requeridos estén presentes
					if (!row.documentId || !row.company || !row.documentType || !row.document || !row.salary || !row.city || !row.direction || !row.phone || !row.email || !row.detail || !row.assignment) {
						throw new Error(
							`Datos incompletos en la fila: ${JSON.stringify(row)}`,
						);
					}

					try {
						return await prisma.employment.create({
							data: {
								documentId: parseInt(row.documentId),
								company: String(row.company),
								documentType: String(row.documentType),
								document: String(row.document),
								salary: String(row.salary),
								city: String(row.city),
								direction: String(row.direction),
								phone: String(row.phone),
								email: String(row.email),
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
				message: `${employments.length} empleos importados con éxito`,
			});
		} catch (error) {
			console.error("Error al importar empleos:", error);
			res.status(400).json({ error: (error as Error).message });
		}
	},
};

