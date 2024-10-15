import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const baseController = {
	uploadBases: async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				res.status(400).json({ mensaje: "No se ha subido ningún archivo" });
				return;
			}

			const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const data = XLSX.utils.sheet_to_json(sheet);

			const bases = await Promise.all(
				data.map(async (row: any) => {
					if (
						!row.operation ||
						!row.bank ||
						!row.account ||
						!row.expiration ||
						!row.disburse ||
						!row.office ||
						!row.dependence
					) {
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
						return await prisma.base.upsert({
							where: { id },
							update: {
								account: parseInt(row.account),
								expiration: String(row.expiration),
								disburse: parseFloat(row.disburse),
								office: String(row.office),
								dependence: String(row.dependence),
								isActive: Boolean(row.isActive),
								updatedAt: colombiaTime.toJSDate(),
							},
							create: {
								id,
								operation,
								bank,
								account: parseInt(row.account),
								expiration: String(row.expiration),
								disburse: parseFloat(row.disburse),
								office: String(row.office),
								dependence: String(row.dependence),
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
				mensaje: `${bases.length} bases importadas con éxito`,
			});
		} catch (error) {
			console.error("Error al importar bases:", error);
			res.status(400).json({ error: (error as Error).message });
		}
	},
};