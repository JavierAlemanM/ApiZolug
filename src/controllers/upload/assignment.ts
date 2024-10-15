import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const assignmentController = {
	uploadAssignments: async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				res.status(400).json({ message: "No se ha subido ningún archivo" });
				return;
			}

			const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const data = XLSX.utils.sheet_to_json(sheet);

			const assignments = await Promise.all(
				data.map(async (row: any) => {
					// Verificar que los campos requeridos estén presentes
					if (!row.operation || !row.bank || !row.assignment) {
						throw new Error(
							`Datos incompletos en la fila: ${JSON.stringify(row)}`,
						);
					}

					let colombiaTime = DateTime.now().setZone("America/Bogota");
					colombiaTime = colombiaTime.minus({ hours: 5 });

					const id = parseInt(`${row.operation}${row.bank}`);

					try {
						return await prisma.assignment.upsert({
							where: { id },
							update: {
								assignment: String(row.assignment),
								updatedAt: colombiaTime.toJSDate(),
							},
							create: {
								id,
								operation: parseInt(row.operation),
								bank: parseInt(row.bank),
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
				message: `${assignments.length} asignaciones importadas con éxito`,
			});
		} catch (error) {
			console.error("Error al importar asignaciones:", error);
			res.status(400).json({ error: (error as Error).message });
		}
	},
};