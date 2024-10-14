import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const managementController = {
  uploadManagements: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No se ha subido ningún archivo" });
        return;
      }

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const managements = await Promise.all(
        data.map(async (row: any) => {
          // Verificar que los campos requeridos estén presentes
          if (!row.operation || !row.bank || !row.assignment || !row.type || !row.destiny || !row.detail || !row.channel || !row.management || !row.createStart || !row.createEnd || !row.contrast) {
            throw new Error(
              `Datos incompletos en la fila: ${JSON.stringify(row)}`,
            );
          }

          try {
            return await prisma.management.create({
              data: {
                operation: parseInt(row.operation),
                bank: parseInt(row.bank),
                assignment: String(row.assignment),
                type: String(row.type),
                destiny: String(row.destiny),
                detail: String(row.detail),
                channel: String(row.channel),
                management: String(row.management),
                createStart: new Date(row.createStart),
                createEnd: new Date(row.createEnd),
                contrast: String(row.contrast),
                updatedAt: new Date(),
              },
            });
          } catch (error: any) {
            throw error;
          }
        }),
      );

      res.status(201).json({
        message: `${managements.length} gestiones importadas con éxito`,
      });
    } catch (error) {
      console.error("Error al importar gestiones:", error);
      res.status(400).json({ error: (error as Error).message });
    }
	},
};
