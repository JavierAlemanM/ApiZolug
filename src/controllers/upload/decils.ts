import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const decilController = {
	uploadDecils: async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				res.status(400).json({ mensaje: "No se ha subido ningún archivo" });
				return;
			}

			const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const data = XLSX.utils.sheet_to_json(sheet);

			const decils = await Promise.all(
				data.map(async (row: any) => {
					// Verificar que los campos requeridos estén presentes
					if (!row.operation || !row.bank || !row.decil) {
						throw new Error(
							`Datos incompletos en la fila: ${JSON.stringify(row)}`,
						);
					}

					const operation = parseInt(row.operation);
					const bank = parseInt(row.bank);
					const id = parseInt(`${operation}${bank}`);

					let colombiaTime = DateTime.now().setZone("America/Bogota");
					colombiaTime = colombiaTime.minus({ hours: 5 });

					try {
						return await prisma.decil.upsert({
							where: { id },
							update: {
								decil: parseInt(row.decil),
								updatedAt: colombiaTime.toJSDate(),
							},
							create: {
								id,
								operation,
								bank,
								decil: parseInt(row.decil),
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
				mensaje: `${decils.length} deciles importados con éxito`,
			});
		} catch (error) {
			console.error("Error al importar deciles:", error);
			res.status(400).json({ error: (error as Error).message });
		}
	},
};
