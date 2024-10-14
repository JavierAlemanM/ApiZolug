import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const paymentController = {
	uploadPayments: async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				res.status(400).json({ message: "No se ha subido ningún archivo" });
				return;
			}

			const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const data = XLSX.utils.sheet_to_json(sheet);

			const payments = await Promise.all(
				data.map(async (row: any) => {
					// Verificar que los campos requeridos estén presentes
					if (!row.operation || !row.bank || !row.value || !row.assignment || !row.date) {
						throw new Error(
							`Datos incompletos en la fila: ${JSON.stringify(row)}`,
						);
					}

					try {
						return await prisma.payment.create({
							data: {
								operation: parseInt(row.operation),
								bank: parseInt(row.bank),
								value: parseInt(row.value),
								assignment: String(row.assignment),
								date: new Date(row.date),
								createdAt: new Date(),
							},
						});
					} catch (error: any) {
						throw error;
					}
				}),
			);

			res.status(201).json({
				message: `${payments.length} pagos importados con éxito`,
			});
		} catch (error) {
			console.error("Error al importar pagos:", error);
			res.status(400).json({ error: (error as Error).message });
		}
	},
};